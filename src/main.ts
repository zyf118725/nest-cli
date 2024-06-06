import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
// 1. 引入
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 2.配置
  const config = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('文档描述')
    .setVersion('1.0')
    // .addTag('接口文档')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // 设置api文档地址, 访问地址：http://localhost:5001/api
  SwaggerModule.setup('api', app, document);
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(5001);
}
bootstrap();
