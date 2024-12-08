import { UserInfoByParseToken } from '@/common/dto';
import { BusinessException } from '@/common/exceptions';
import { PrismaService } from '@/common/prisma/prisma.service';
import config from '@/config';
import { encryptPassword } from '@/utils/cryptogram';
import { handleTree } from '@/utils/format';
import { Injectable } from '@nestjs/common';
import { MenuVo } from '../system/menu/dto/menu.vo';
import { UpdatePasswordDto, UpdateProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}
  // 获取个人信息
  async getProfileInfo(user: UserInfoByParseToken) {
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

  async getProfileMenus(userId: number): Promise<MenuVo[]> {
    const roleInfo = await this.prismaService.user.findUnique({
      select: {
        role: {
          include: {
            menus: {
              include: {
                children: true
              }
            }
          }
        }
      },
      where: {
        id: userId
      }
    });
    if (roleInfo.role.name === config.adminRole) {
      const menus = await this.prismaService.menu.findMany();
      return handleTree(menus);
    }
    else {
      return handleTree(roleInfo.role.menus);
    }
  }

  // 更新个人中心用户信息
  async updateProfileInfo(user: UserInfoByParseToken, info: UpdateProfileDto) {
    await this.prismaService.user.update({
      where: {
        id: user.id
      },
      data: info
    });
  }

  // 重置密码
  async updateProfilePassword(user: UserInfoByParseToken, info: UpdatePasswordDto) {
    const userInfo = await this.prismaService.user.findUnique({
      where: { id: user.id }
    });
    if (userInfo && userInfo.password === encryptPassword(info.oldPassword, userInfo.salt)) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          password: encryptPassword(info.newPassword, userInfo.salt)
        }
      });
    }
    BusinessException.throwError('exception.profile.old_password_incorrect');
  }
}
