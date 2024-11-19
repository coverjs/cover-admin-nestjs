import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { UserInfoByParseToken } from '@/common/dto';
import { MenuService } from '../system/menu/menu.service';
import { handleTree } from '@/utils/common';
import { MenuVo } from '../system/menu/dto/menu.vo';
import { UpdateProfileDto, UpdatePasswordDto } from './dto/profile.dto';
import { console } from 'inspector';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly menuService: MenuService
  ) {}
  // 获取用户信息
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
  updatePassword(user: UserInfoByParseToken, info: UpdatePasswordDto) {
    console.log('走了吗');
    console.log(user, 'user222111', info);
    return 'sss';
  }

  // 获取用户菜单
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
}
