import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserListDto } from './dto/user.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { encryptPassword, makeSalt } from '@/utils/cryptogram';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const salt = makeSalt();
    createUserDto.password = encryptPassword(password, salt);
    await this.prismaService.user.create({
      data: {
        salt,
        ...createUserDto
      }
    });
  }

  async findList(queryUserList: UserListDto) {
    const { skip, take, username, email, nickname, enable, roleId } = queryUserList;
    const listData = await this.prismaService.user.findMany({
      where: {
        username: {
          contains: username
        },
        email: {
          contains: email
        },
        nickname: {
          contains: nickname
        },
        roleId: roleId ? Number(roleId) : undefined,
        enable: enable ? Boolean(enable) : undefined
      },
      include: {
        role: true
      },
      skip,
      take
    });

    return {
      list: listData,
      total: listData.length
    };
  }

  async findOne(id: number) {
    const { password, salt, ...res } = await this.prismaService.user.findUnique({
      where: {
        id
      },
      include: {
        role: true
      }
    });
    return res;
  }

  async exportJob(queryUserList: UserListDto) {
    const nameMap: {
      [key: string]: string;
    } = {
      id: '用户ID',
      username: '用户名',
      email: '邮箱',
      nickname: '昵称',
      role: '角色',
      enable: '是否可用',
      createdAt: '创建时间',
      updatedAt: '更新时间'
    }; // 如果需要其他字段自己添加
    const titleName = Object.values(nameMap);
    const { list } = await this.findList(queryUserList);
    const xlsxData = list.map((item) => {
      return Object.keys(nameMap).map((key) => {
        if (key === 'role') {
          return item[key].name;
        }
        if (key === 'enable') {
          return item[key] ? '是' : '否';
        }
        return item[key];
      });
    });
    return { titleName, xlsxData, fileName: '用户列表' };
  }
}
