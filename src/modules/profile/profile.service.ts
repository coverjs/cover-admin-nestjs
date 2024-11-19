import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { UserInfoByParseToken } from '@/common/dto';
import { MenuService } from '../system/menu/menu.service';
import { MenuVo } from '../system/menu/dto/menu.vo';
import { handleTree } from '@/utils/format';
import { UpdateProfileDto, UpdatePasswordDto } from './dto/profile.dto';
import { encryptPassword } from '@/utils/cryptogram';
import { BusinessException } from '@/common/exceptions';

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
    if (roleInfo.role.name === 'admin') {
      return await this.menuService.findList();
    } else {
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
		if(userInfo && userInfo.password === encryptPassword(info.oldPassword, userInfo.salt)) {
			await this.prismaService.user.update({
				where: { id: user.id },
				data: {
					password: encryptPassword(info.newPassword, userInfo.salt)
				}
			});
			return null
		}
    BusinessException.throwUsernameOrPasswordIncorrect();
  }
}
