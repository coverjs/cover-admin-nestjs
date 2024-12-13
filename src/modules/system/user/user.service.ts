import { BusinessException } from '@/common/exceptions';
import { PrismaService } from '@/common/prisma/prisma.service';
import config from '@/config';
import { findListData } from '@/utils/common';
import { encryptPassword, makeSalt } from '@/utils/cryptogram';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto, UpdateUserDto, UserListDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  // 新建用户
  async create(createUserDto: CreateUserDto) {
    const { password, username } = createUserDto;
    const salt = config.passwordEncryption ? makeSalt() : '';
    const role = await this.prismaService.role.findUnique({ where: { id: createUserDto.roleId } });
    if (!role) {
      BusinessException.throwError('exception.role.role_not_exist');
    }

    if (config.passwordEncryption) {
      createUserDto.password = encryptPassword(password, salt);
    }

    const user = await this.prismaService.user.findUnique({ where: { username } });
    if (user) {
      BusinessException.throwError('exception.user.username_already_exists');
    }
    await this.prismaService.user.create({
      data: {
        salt,
        ...createUserDto
      }
    });
  }

  // 查询列表
  async findList(queryUserList: UserListDto) {
    const { skip, take, username, email, nickname, enable, roleId } = queryUserList;
    return await findListData<Prisma.UserFindManyArgs>(this.prismaService.user, {
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
        roleId,
        enable
      },
      include: { role: true },
      skip,
      take
    }, ['password', 'salt']);
  }

  // 查询一条
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

  // 删除一条
  async deleteUserById(id: number) {
    await this.prismaService.$transaction([
      this.prismaService.user.delete({ where: { id } })
    ]);
  };

  // 修改一条
  async updateUserById(id: number, data: UpdateUserDto) {
    const role = await this.prismaService.role.findUnique({ where: { id: data.roleId } });
    if (!role) {
      BusinessException.throwError('exception.role.role_not_exist');
    }
    await this.prismaService.$transaction([
      this.prismaService.user.update({
        where: { id },
        data
      })
    ]);
  }

  // 导出数据
  async exportUser(queryUserList: UserListDto) {
    const nameMap: {
      [key: string]: string
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
    const data = await this.findList(queryUserList);
    const xlsxData = data.list.map(item => {
      return Object.keys(nameMap).map(key => {
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
