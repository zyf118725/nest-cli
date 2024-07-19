import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('redis')
@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  // 测试redis
  @ApiOperation({ summary: '测试redis', description: '测试redis' })
  @Public()
  @Post('testredis')
  testredis() {
    return this.redisService.testredis();
  }
}
