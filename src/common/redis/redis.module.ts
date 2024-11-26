import { RedisModule } from '@nestjs-modules/ioredis';
import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Global()
@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          type: 'single',
          url: configService.get('REDIS_URL')
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [RedisService, Redis],
  exports: [RedisService, Redis]
})
export class IoredisModule {}
