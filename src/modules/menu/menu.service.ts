import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/menu.dto';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createMenuData: CreateMenuDto) {
    await this.prismaService.$transaction([
      this.prismaService.menu.create({
        data: createMenuData
      })
    ]);
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
