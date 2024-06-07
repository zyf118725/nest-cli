import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  // 全局DTO校验
  app.useGlobalPipes(new ValidationPipe());

  // 配置swagger
  const config = new DocumentBuilder().setTitle('接口文档').setDescription('文档描述').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document); //  访问地址：http://localhost:5001/doc; 使用doc替代api做出区分

  await app.listen(port);
}
bootstrap();
