import { CommonApiResponse } from '@/common/decorators/apiResponse';
import { CommonApiOperation } from '@/common/decorators/common-api-operation.dec';
import { User } from '@/common/decorators/user';
import { UserInfoByParseToken } from '@/common/dto';
import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MenuVo } from '../system/menu/dto/menu.vo';
import { UpdatePasswordDto, UpdateProfileDto } from './dto/profile.dto';
import { ProfileVo } from './dto/profile.vo';
import { ProfileService } from './profile.service';

@Controller('profile')
@ApiTags('个人信息')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get()
  @CommonApiOperation({ summary: '获取当前用户信息' })
  @CommonApiResponse({ type: ProfileVo })
  async getInfo(@User() user: UserInfoByParseToken) {
    return this.profileService.getProfileInfo(user);
  }

  @Patch('/update')
  @CommonApiOperation({ summary: '修改当前登录用户信息' })
  @CommonApiResponse()
  async updateInfo(@User() user: UserInfoByParseToken, @Body() body: UpdateProfileDto) {
    return await this.profileService.updateProfileInfo(user, body);
  }

  @Patch('/updatePassword')
  @CommonApiOperation({ summary: '修改密码' })
  @CommonApiResponse()
  async updatePassword(@User() user: UserInfoByParseToken, @Body() body: UpdatePasswordDto) {
    return await this.profileService.updateProfilePassword(user, body);
  }

  @Get('/menus')
  @CommonApiOperation({ summary: '获取当前用户菜单' })
  @CommonApiResponse({
    type: 'array',
    itemType: MenuVo
  })
  async getMenus(@User() user: UserInfoByParseToken) {
    return await this.profileService.getProfileMenus(user.id);
  }
}
