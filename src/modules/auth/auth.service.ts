import type { PrismaService } from '@/common/prisma/prisma.service';
import type { RedisService } from '@/common/redis/redis.service';
import type { ConfigService } from '@nestjs/config';
import type { JwtService } from '@nestjs/jwt';
import type { AccountLoginDto } from './dto/auth.dto';
import { JWT_SECRET } from '@/common/constants';
import { BusinessException } from '@/common/exceptions';
import config from '@/config';
import { encryptPassword } from '@/utils/cryptogram';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService
  ) { }

  /**
   * 登录
   * @param account
   */
  async login(account: AccountLoginDto) {
    const { username, password } = account;
    const userInfo = await this.prismaService.user.findUnique({
      where: { username },
      include: {
        role: {
          include: {
            menus: true
          }
        }
      }
    });

    if (userInfo && userInfo.password === encryptPassword(password, userInfo.salt)) {
      const userToken = await this.redisService.getUserToken(userInfo.id);
      // 如果缓存中有token，直接返回token
      if (userToken)
        return { token: userToken };

      const { id, username, role } = userInfo;
      let permissions = [];
      if (role.name === config.adminRole)
        permissions = ['*:*:*'];
      else permissions = userInfo.role.menus.map(item => item.code);

      const token = this.jwtService.sign(
        { id, username, version: 1 },
        {
          secret: this.configService.get(JWT_SECRET),
          expiresIn: config.tokenExpires
        }
      );

      await this.redisService.setUserToken(id, token);
      await this.redisService.setUserInfo(id, {
        ...userInfo,
        permissions
      });
      return { token };
    }
    BusinessException.throwUsernameOrPasswordIncorrect();
  }

  async logout(userId: number) {
    await this.redisService.delUserCache(userId);
  }
}
