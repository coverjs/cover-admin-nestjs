import type { UserInfoByParseToken } from '@/common/dto';
import type { PrismaService } from '@/common/prisma/prisma.service';
import type { MenuVo } from '../system/menu/dto/menu.vo';
import type { MenuService } from '../system/menu/menu.service';
import type { UpdatePasswordDto, UpdateProfileDto } from './dto/profile.dto';
import { BusinessException } from '@/common/exceptions';
import config from '@/config';
import { encryptPassword } from '@/utils/cryptogram';
import { handleTree } from '@/utils/format';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly menuService: MenuService
  ) {}

  async getUserInfo(user: UserInfoByParseToken) {
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

  async getUserMenus(userId: number): Promise<MenuVo[]> {
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
      return await this.menuService.findList();
    }
    else {
      return handleTree(roleInfo.role.menus);
    }
  }

  // 更新个人中心用户信息
  async updateUserInfo(user: UserInfoByParseToken, info: UpdateProfileDto) {
    await this.prismaService.user.update({
      where: {
        id: user.id
      },
      data: info
    });
  }

  // 重置密码
  async updatePassword(user: UserInfoByParseToken, info: UpdatePasswordDto) {
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
    BusinessException.throwOldPasswordIncorrect();
  }
}
