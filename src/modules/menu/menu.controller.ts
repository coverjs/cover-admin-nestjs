import { Controller, Post, Body } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/menu.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonApiResponse } from '@/common/decorators/apiResponse';

@ApiTags('系统管理-菜单管理')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: '新建菜单' })
  @CommonApiResponse()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  // @Get()
  // findAll() {
  //   return this.menuService.findAll();
  // }

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
