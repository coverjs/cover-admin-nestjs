import { CommonApiResponse } from '@/common/decorators/apiResponse';
import { CommonApiOperation } from '@/common/decorators/common-api-operation.dec';
import { PaginationPipe } from '@/common/pipes/pagination.pipe';
import { XlsxService } from '@/common/xlsx/xlsx.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Response } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response as Rs } from 'express';
import { CreateUserDto, UpdateUserDto, UserListDto } from './dto/user.dto';
import { UserInfoVo } from './dto/user.vo';
import { UserService } from './user.service';

@ApiTags('系统管理-用户管理')
@Controller('system/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly xlsxService: XlsxService
  ) {}

  @Post()
  @CommonApiOperation({ summary: '新建用户', permissionCode: 'system:user:add' })
  @CommonApiResponse()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @CommonApiOperation({ summary: '获取用户列表', permissionCode: 'system:user:list' })
  @CommonApiResponse({ type: 'list', itemType: UserInfoVo })
  findList(@Query(PaginationPipe) queryUserList: UserListDto) {
    return this.userService.findList(queryUserList);
  }

  @Delete(':id')
  @CommonApiOperation({ summary: '根据id删除用户', permissionCode: 'system:user.delete' })
  @CommonApiResponse()
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }

  @Patch(':id')
  @CommonApiOperation({ summary: '根据id修改用户', permissionCode: 'system:user:update' })
  @CommonApiResponse()
  updateUser(@Param('id') id: number, @Body() userInfo: UpdateUserDto) {
    return this.userService.updateUserById(id, userInfo);
  }

  @Get('export')
  @CommonApiOperation({ summary: '导出用户列表', permissionCode: 'system:user:export' })
  @ApiResponse({
    content: {
      'text/plain': {
        schema: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  async exportJob(@Query(PaginationPipe) queryUserList: UserListDto, @Response() res: Rs) {
    const { titleName, xlsxData, fileName } = await this.userService.exportUser(queryUserList);
    const file = await this.xlsxService.exportExcel(titleName, xlsxData, fileName);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats;charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent(fileName)}.xlsx`); // 中文名需要进行url转码
    res.setTimeout(30 * 60 * 1000); // 防止网络原因造成超时。
    res.end(file, 'binary');
  }
}
