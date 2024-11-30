import { PrismaService } from '@/common/prisma/prisma.service';
import { handleTree } from '@/utils/format';
import { Injectable } from '@nestjs/common';
import { NodeType } from '@prisma/client';
import { CreateMenuDto } from './dto/menu.dto';
import { MenuVo } from './dto/menu.vo';

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
    const data = await this.prismaService.menu.findMany({
      where: {},
      include: {
        children: true
      }
    });
    return handleTree(data) as MenuVo[];
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
