import { Controller, Get, Body, Patch } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from '@/common/decorators/user';
import { ApiTags } from '@nestjs/swagger';
import { CommonApiResponse } from '@/common/decorators/apiResponse';
import { ProfileVo } from './dto/profile.vo';
import { UpdateProfileDto, UpdatePasswordDto } from './dto/profile.dto';
import { UserInfoByParseToken } from '@/common/dto';
import { MenuVo } from '../system/menu/dto/menu.vo';
import { CommonApiOperation } from '@/common/decorators/common-api-operation.dec';

@Controller('profile')
@ApiTags('个人信息')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @CommonApiOperation({ summary: '获取当前用户信息' })
  @CommonApiResponse({ type: ProfileVo })
  async findUserInfo(@User() user: UserInfoByParseToken) {
    return this.profileService.getUserInfo(user);
  }

  @Patch('/update')
  @CommonApiOperation({ summary: '修改当前登录用户信息' })
  @CommonApiResponse()
  async updateUserInfo(@User() user: UserInfoByParseToken, @Body() body: UpdateProfileDto) {
    return await this.profileService.updateUserInfo(user, body);
  }

  @Patch('/updatePassword')
  @CommonApiOperation({ summary: '修改密码' })
  @CommonApiResponse()
  async updatePassword(@User() user: UserInfoByParseToken, @Body() body: UpdatePasswordDto) {
    return await this.profileService.updatePassword(user, body);
  }

  @Get('/menus')
  @CommonApiOperation({ summary: '获取当前用户菜单' })
  @CommonApiResponse({
    type: 'array',
    itemType: MenuVo
  })
  async getMenus(@User() user: UserInfoByParseToken) {
    return await this.profileService.getUserMenus(user.id);
  }
}
