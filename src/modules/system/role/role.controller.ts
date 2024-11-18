import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, RoleListDto } from './dto/role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonApiResponse } from '@/common/decorators/apiResponse';
import { PaginationPipe } from '@/common/pipes/pagination.pipe';
import { RoleVo } from './dto/role.vo';
import { CommonApiOperation } from '@/common/decorators/common-api-operation.dec';
@ApiTags('系统管理-角色管理')
@Controller('system/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @CommonApiOperation({ summary: '创建角色', permissionCode: 'system:role:add' })
  @CommonApiResponse()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @CommonApiOperation({ summary: '获取角色列表', permissionCode: 'system:role:list' })
  @CommonApiResponse({
    type: 'array',
    itemType: RoleVo
  })
  fineList(@Query(PaginationPipe) queryRoleList: RoleListDto) {
    return this.roleService.findList(queryRoleList);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.roleService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.roleService.update(+id, updateRoleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.roleService.remove(+id);
  // }
}
