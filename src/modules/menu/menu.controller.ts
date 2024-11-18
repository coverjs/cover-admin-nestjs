import { Controller, Post, Body, Get } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/menu.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonApiResponse } from '@/common/decorators/apiResponse';
import { handleTree } from '@/utils/common';
import { MenuVo } from './dto/menu.vo';
import { PermissionsAuth } from '@/common/decorators/permissions-auth.decorator';

@ApiTags('系统管理-菜单管理')
@Controller('system/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: '新建菜单' })
  @PermissionsAuth('system:menu:add')
  @CommonApiResponse()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({
    summary: '查询菜单列表',
    description: '获取菜单列表数据<br><br>权限码: <code>system:menu:list</code>'
  })
  @PermissionsAuth('system:menu:list')
  @CommonApiResponse({
    type: 'array',
    itemType: MenuVo
  })
  async findList() {
    const list = await this.menuService.findList();
    return handleTree(list);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.menuService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
  //   return this.menuService.update(+id, updateMenuDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.menuService.remove(+id);
  // }
}
