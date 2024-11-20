import { Controller, Post, Body, Get, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
import { ApiTags } from '@nestjs/swagger';
import { CommonApiResponse } from '@/common/decorators/apiResponse';
import { MenuVo } from './dto/menu.vo';
import { CommonApiOperation } from '@/common/decorators/common-api-operation.dec';

@ApiTags('系统管理-菜单管理')
@Controller('system/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @CommonApiOperation({
    summary: '新建菜单',
    description: '创建菜单',
    permissionCode: 'system:menu:add'
  })
  @CommonApiResponse()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @CommonApiOperation({
    summary: '查询菜单列表',
    description: '获取菜单列表数据',
    permissionCode: 'system:menu:list'
  })
  @CommonApiResponse({
    type: 'array',
    itemType: MenuVo
  })
  async findList() {
    const list = await this.menuService.findList();
    return list;
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.menuService.findOne(+id);
  // }

  @Patch(':id')
  @CommonApiOperation({ summary: '修改菜单' })
  @CommonApiResponse()
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.menuService.remove(+id);
  // }
}
