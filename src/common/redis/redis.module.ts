import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisService } from './redis.service';

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
  providers: [RedisService],
  exports: [RedisService]
})
export class IoredisModule {}
