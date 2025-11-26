import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './util/exception.filter';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  app.setGlobalPrefix('api'); // 设置全局前缀为 'api'

  // 全局DTO校验
  app.useGlobalPipes(new ValidationPipe());

  // 配置swagger
  const config = new DocumentBuilder().setTitle('接口文档').setDescription('文档描述').setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/doc', app, document);

  app.use(cors()); // 全局启用 CORS
  app.useGlobalFilters(new AllExceptionsFilter()); // 注册全局异常过滤器
  app.use(json({ limit: '100mb' })); // 全局设置请求体大小限制

  await app.listen(port);
  const host = `http://localhost:${port}/api`;
  console.info(`main (${configService.get('other')}Host): ${host}`);
  console.info(`main (swagger): ${host}/doc`);
}
bootstrap();
