import type { UserInfoByParseToken } from '@/common/dto';
import type { AuthService } from './auth.service';
import type { AccountLoginDto } from './dto/auth.dto';
import { CommonApiResponse } from '@/common/decorators/apiResponse';
import { CommonApiOperation } from '@/common/decorators/common-api-operation.dec';
import { User } from '@/common/decorators/user';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountLoginVo } from './dto/auth.vo';

@Controller('auth')
@ApiTags('授权')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  @CommonApiOperation({ summary: '用户登录', isPublic: true })
  @CommonApiResponse({ type: AccountLoginVo })
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
