import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { UserInfoByParseToken } from '@/common/dto';
import { UpdateProfileDto } from './dto/profile.dto';
import { console } from 'inspector';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}
  async getUserInfo(user: UserInfoByParseToken) {
    console.log(user, 'user');
    const { password, salt, ...userInfo } = await this.prismaService.user.findUnique({
      where: {
        id: user.id
      },
      include: {
        role: true
      }
    });
    return userInfo;
  }
  async updateUserInfo(userInfo: UpdateProfileDto) {
    console.log('走了吗');
    console.log(userInfo, 'userInfo');
    return {
      gg: 'eeeeeeeeeee'
    };
  }
}
