import { Controller, Get, Post, Body, Query, Delete, ParseIntPipe, Patch, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, RoleListDto, UpdateRoleDto } from './dto/role.dto';
import { ApiTags } from '@nestjs/swagger';
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

  @Delete(':id')
  @CommonApiOperation({ summary: '删除角色', permissionCode: 'system:role:delete' })
  @CommonApiResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.removeById(id);
  }

  // 修改角色
  @Patch(':id')
  @CommonApiOperation({ summary: '修改角色', permissionCode: 'system:role:update' })
  @CommonApiResponse()
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateById(id, updateRoleDto);
  }
}
