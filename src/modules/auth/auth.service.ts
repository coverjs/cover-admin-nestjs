import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccountLoginDto } from './dto/auth.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { encryptPassword } from '@/utils/cryptogram';
import { BusinessException } from '@/common/exceptions';
import { JWT_SECRET, USER_SESSION_ID_KEY, USER_VERSION_KEY } from '@/common/constants';
import config from '@/config';
import { Request } from 'express';
import { ERROR_CODE } from '@/common/error-codes';
import { USER_TOKEN_KEY, USER_INFO_KEY } from '@/common/constants';
import { Redis } from 'ioredis';
import { parseCookie, checkRedisTransactionStatus } from '@/utils/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly redis: Redis
  ) {}

  /**
   * 登录
   * @param account
   * @returns
   */
  async login(account: AccountLoginDto, request: Request) {
    const { username, password } = account;
    const sessionId = parseCookie(request.headers.cookie, 'JSESSIONID');
    if (!sessionId) {
      throw new BusinessException(ERROR_CODE.ILEGAL_SESSION_ID);
    }

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
      const tokenKey = `${USER_TOKEN_KEY}:${userInfo.id}`;
      const userInfoKey = `${USER_TOKEN_KEY}:${userInfo.id}`;
      const sessionKey = `${USER_SESSION_ID_KEY}:${userInfo.id}`;

      const userToken = await this.redis.get(tokenKey);

      // 如果缓存中有token，直接返回token
      // if (userToken) return { token: userToken };

      const { id, username, role } = userInfo;
      let permissions = [];
      if (role.name === config.adminRole) permissions = ['*:*:*'];
      else permissions = userInfo.role.menus.map((item) => item.code);

      const token = this.jwtService.sign(
        { id, username, version: 1 },
        {
          secret: this.configService.get(JWT_SECRET),
          expiresIn: config.tokenExpires
        }
      );

      const transaction = this.redis.multi();
      if (!userToken) {
        transaction.set(tokenKey, token, 'EX', config.tokenExpires);
      }
      transaction.set(sessionKey, sessionId, 'EX', config.tokenExpires);
      transaction.set(userInfoKey, JSON.stringify({ ...userInfo, permissions }), 'EX', config.tokenExpires);
      const results = await transaction.exec();
      checkRedisTransactionStatus(results);

      return { token };
    }
    BusinessException.throwUsernameOrPasswordIncorrect();
  }

  async logout(userId: number) {
    await this.redis.del(
      `${USER_TOKEN_KEY}:${userId}`,
      `${USER_INFO_KEY}:${userId}`,
      `${USER_VERSION_KEY}:${userId}`,
      `${USER_SESSION_ID_KEY}:${userId}`
    );
  }
}
