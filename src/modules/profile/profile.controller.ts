import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from '@/common/decorators/user';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonApiResponse } from '@/common/decorators/apiResponse';
import { ProfileVo } from './dto/profile.vo';
import { UserInfoByParseToken } from '@/common/dto';
import { MenuVo } from '../system/menu/dto/menu.vo';

@Controller('profile')
@ApiTags('个人信息')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: '获取当前用户信息' })
  @CommonApiResponse({ type: ProfileVo })
  async findUserInfo(@User() user: UserInfoByParseToken) {
    return this.profileService.getUserInfo(user);
  }

  @Get('/menus')
  @ApiOperation({ summary: '获取当前用户菜单' })
  @CommonApiResponse({
    type: 'array',
    itemType: MenuVo
  })
  async getMenus(@User() user: UserInfoByParseToken) {
    return await this.profileService.getUserMenus(user.id);
  }
}
