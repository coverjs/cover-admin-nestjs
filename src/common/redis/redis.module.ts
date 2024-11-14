import { RedisModule } from '@nestjs-modules/ioredis';
import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://127.0.0.1:6379'
    })
  ],
  providers: [RedisService],
  exports: [RedisService]
})
export class IoredisModule {}
