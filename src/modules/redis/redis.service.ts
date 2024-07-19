import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { formatSuccess } from 'src/util';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async get<T>(key: string): Promise<T> {
    return await this.cacheManager.get(key);
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    console.log('set===');
    const res = await this.cacheManager.set(key, value, ttl);
    console.log('res1: ', res);
    return res;
  }

  // 删除
  async del(key: string): Promise<void> {
    return await this.cacheManager.del(key);
  }

  // 测试
  async testredis() {
    const res = await this.set('aaa1', 'aaa', 10 * 1000);
    console.log('res: ', res);
    return formatSuccess('aa');
  }
}
