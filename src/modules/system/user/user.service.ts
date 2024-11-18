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
        roleId,
        enable
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
}
