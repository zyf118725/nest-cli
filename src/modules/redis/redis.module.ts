import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import type { RedisClientOptions } from 'redis';

@Global() // 这里我们使用@Global 装饰器让这个模块变成全局的
@Module({
  controllers: [RedisController],
  providers: [RedisService],
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.get<string>('redis.host'),
            port: configService.get<number>('redis.port'),
          },
          // ttl: configService.get<number>('redis.xxx'),
          // database: configService.get<number>('redis.database'),
          // password: configService.get<string>('REDIS_PASSWORD'),
        });
        return {
          store,
        };
      },
    }),
  ],
  exports: [RedisService],
})
export class RedisModule {}
