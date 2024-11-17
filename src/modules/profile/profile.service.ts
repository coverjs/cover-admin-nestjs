import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { UserInfoByParseToken } from '@/common/dto';
import { MenuService } from '../menu/menu.service';
import { handleTree } from '@/utils/common';
import { MenuVo } from '../menu/dto/menu.vo';

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
}
