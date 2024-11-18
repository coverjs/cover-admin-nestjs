import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from '@/common/decorators/user';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonApiResponse } from '@/common/decorators/apiResponse';
import { ProfileVo } from './dto/profile.vo';
import { UserInfoByParseToken } from '@/common/dto';
import { UpdateProfileDto } from './dto/profile.dto';

@Controller('profile')
@ApiTags('个人信息')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: '获取个人信息' })
  @CommonApiResponse({ type: ProfileVo })
  async findUserInfo(@User() user: UserInfoByParseToken) {
    return this.profileService.getUserInfo(user);
  }

  @Patch()
  @ApiOperation({ summary: '修改个人信息' })
  @CommonApiResponse()
  async updateUserInfo(@User() user: UserInfoByParseToken, @Body() body: UpdateProfileDto) {
    return this.profileService.updateUserInfo(body);
  }

  @Patch('password')
  @ApiOperation({ summary: '重置密码' })
  @CommonApiResponse()
  async resetPassword(@User() user: UserInfoByParseToken) {
    console.log(user);
  }
}
