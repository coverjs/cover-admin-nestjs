import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import type { Redis } from 'ioredis';
import { parse } from 'redis-info';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  // async getKeys(cacheName: string) {
  //   return await this.redis.keys(`${cacheName}:*`);
  // }

  async set(key: string, value: any) {
    await this.redis.set(key, value);
  }

  async get(key: string) {
    return await this.redis.get(key);
  }

  // async clearCacheName(cacheName: string) {
  //   const keys = await this.getKeys(cacheName);
  //   await this.redis.del(keys);
  // }

  async delete(key: string) {
    await this.redis.del(key);
  }

  async clearCacheAll() {
    // const cacheList = await this.getNames();
    // const prismaArr = cacheList.map((item) => {
    //   return this.clearCacheName(item.cacheName);
    // });
    // return await Promise.all(prismaArr);
  }

  /* 获取redis信息 */
  async getRedisInfo() {
    const info = await this.redis.info();
    const redisIfo = parse(info);
    const dbSize = (await this.redis.keys('*')).length;
    return {
      dbSize,
      commandStats: [
        {
          name: '缓存命中成功',
          value: redisIfo.keyspace_hits
        },
        {
          name: '缓存命中失败',
          value: redisIfo.keyspace_misses
        }
      ],
      info: redisIfo
    };
  }
}
