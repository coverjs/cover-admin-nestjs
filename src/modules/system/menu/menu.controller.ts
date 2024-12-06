import { CommonApiResponse } from '@/common/decorators/apiResponse';
import { CommonApiOperation } from '@/common/decorators/common-api-operation.dec';
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
import { MenuVo } from './dto/menu.vo';
import { MenuService } from './menu.service';

@ApiTags('系统管理-菜单管理')
@Controller('system/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

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
    summary: '获取菜单列表',
    description: '获取菜单列表数据',
    permissionCode: 'system:menu:list'
  })
  @CommonApiResponse({
    type: 'list',
    itemType: MenuVo
  })
  async findList() {
    return await this.menuService.findList();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.menuService.findOne(+id);
  // }

  @Patch(':id')
  @CommonApiOperation({ summary: '修改菜单', permissionCode: 'system:menu:update' })
  @CommonApiResponse()
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.menuService.remove(+id);
  // }
}
