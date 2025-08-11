import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './util/exception.filter';
import { join } from 'path';
import * as express from 'express';
import { ServeStaticModule } from '@nestjs/serve-static';
async function bootstrap() {
  const app: any = await NestFactory.create(AppModule);
  const configService: any = app.get(ConfigService);
  const port: any = configService.get('port');
  app.setGlobalPrefix('api'); // 设置全局前缀为 'api'

  // 全局DTO校验
  app.useGlobalPipes(new ValidationPipe());

  // 配置swagger
  const config = new DocumentBuilder().setTitle('接口文档').setDescription('文档描述').setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/doc', app, document);

  app.use(cors()); // 全局启用 CORS
  app.useGlobalFilters(new AllExceptionsFilter()); // 注册全局异常过滤器
  await app.listen(port);
  console.info(`main: ${configService.get('other')}-serve started http://localhost:${port}/api`);

  // 配置静态文件服务
  // app.use('/public', express.static(join(__dirname, '..', 'public'))); // ❌
}
bootstrap();
