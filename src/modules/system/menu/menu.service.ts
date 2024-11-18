import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/menu.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { filterValue, handleTree } from '@/utils/common';
import { MenuVo } from './dto/menu.vo';
import { NodeType } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private readonly prismaService: PrismaService) {}
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

    return handleTree(filterValue(data, null)) as MenuVo[];
  }

  // findAll() {
  //   return `This action returns all menu`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} menu`;
  // }

  // update(id: number, updateMenuDto: UpdateMenuDto) {
  //   return `This action updates a #${id} menu`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} menu`;
  // }
}
