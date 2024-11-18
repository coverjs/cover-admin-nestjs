import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CommonApiResponse } from '@/common/decorators/apiResponse';
import { AccountLoginDto } from './dto/auth.dto';
import { AccountLoginVo } from './dto/auth.vo';
import { CommonApiOperation } from '@/common/decorators/common-api-operation.dec';
import { UserInfoByParseToken } from '@/common/dto';
import { User } from '@/common/decorators/user';

@Controller('auth')
@ApiTags('授权')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  @CommonApiOperation({ summary: '用户登录' })
  @CommonApiResponse({ isPublic: true, type: AccountLoginVo })
  login(@Body() accountInfo: AccountLoginDto) {
    return this.authService.login(accountInfo);
  }

  @Post('/logout')
  @CommonApiOperation({ summary: '退出登录' })
  @CommonApiResponse()
  logout(@User() user: UserInfoByParseToken) {
    return this.authService.logout(user.id);
  }
}
