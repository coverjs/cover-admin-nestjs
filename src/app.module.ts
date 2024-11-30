import process from 'node:process';
import { IoredisModule } from '@/common/redis/redis.module';
import { XlsxModule } from '@/common/xlsx/xlsx.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { ExeptionsFilter } from './common/exceptions';
import { JwtAuthGuard } from './common/guard';
import { DemoEnvGuard } from './common/guard/demo-env.guard';
import { PermissionAuthGuard } from './common/guard/permission-auth.guard';
import { ResponseInterceptor } from './common/interceptor';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { MenuModule } from './modules/system/menu/menu.module';
import { RoleModule } from './modules/system/role/role.module';
import { UserModule } from './modules/system/user/user.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    IoredisModule,
    // 日志模块
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        // timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`
        // eslint-disable-next-line no-undefined
        transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined
      }
    }),
    // 加载环境变量
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProfileModule,
    UserModule,
    RoleModule,
    MenuModule,
    UploadModule,
    XlsxModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: DemoEnvGuard
    },
    // jwt 校验守卫
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },

    // 角色权限权限守卫
    {
      provide: APP_GUARD,
      useClass: PermissionAuthGuard
    },

    // 统一响应格式
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },

    // 异常过滤器
    {
      provide: APP_FILTER,
      useClass: ExeptionsFilter
    }
  ]
})
export class AppModule { }
