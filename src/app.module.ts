import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './common/guard';
import { ExeptionsFilter } from './common/exceptions';
import { ResponseInterceptor } from './common/interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { UserModule } from './modules/system/user/user.module';
import { RoleModule } from './modules/system/role/role.module';
import { UploadModule } from './modules/upload/upload.module';
import { ProfileModule } from './modules/profile/profile.module';
// import { PermisionsGuard } from './common/guard/permission-verify';
import { MenuModule } from './modules/system/menu/menu.module';
import { PermissionAuthGuard } from './common/guard/permission-auth.guard';
import { IoredisModule } from '@/common/redis/redis.module';
import { XlsxModule } from '@/common/xlsx/xlsx.module';

import { LoggerModule } from 'nestjs-pino';
import { DemoEnvGuard } from './common/guard/demo-env.guard';
@Module({
  imports: [
    IoredisModule,
    // 日志模块
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        // timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`
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
export class AppModule {}
