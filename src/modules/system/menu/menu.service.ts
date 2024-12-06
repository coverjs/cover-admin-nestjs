import { PrismaService } from '@/common/prisma/prisma.service';
import { findListData } from '@/utils/common';
import { Injectable } from '@nestjs/common';
import { NodeType, Prisma } from '@prisma/client';
import { CreateMenuDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(private readonly prismaService: PrismaService) { }
  async create(createMenuData: CreateMenuDto) {
    if (createMenuData.type === NodeType.DIRECTORY && !createMenuData.icon) {
      createMenuData.icon = 'FolderOutlined';
    }

    if (createMenuData.type === NodeType.MENU && !createMenuData.icon) {
      createMenuData.icon = 'FileOutlined';
    }

    await this.prismaService.$transaction([
      this.prismaService.menu.create({
        data: createMenuData
      })
    ]);
  }

  async findList() {
    return await findListData<Prisma.MenuFindManyArgs>(this.prismaService.menu, {
      tree: true,
      where: {},
      include: {
        children: true
      }
    });
  }

  async update(id: number, updateMenuDto: CreateMenuDto) {
    await this.prismaService.menu.update({
      where: {
        id
      },
      data: updateMenuDto
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} menu`;
  // }
}
