import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { UserModule } from './modules/user/user.module';
import { GoodsModule } from './modules/goods/goods.module';

// __dirname
console.log('__dirname: ', __dirname);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'aliyun-vobile-test-db.ops.vobile.org',
      port: 3306,
      username: 'devuser',
      password: 'devpass',
      database: 'nsettest',
      // 扫描本项目中.entity.ts或者.entity.js的文件
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UserModule,
    GoodsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // forRoutes可放路由forRoutes('goods')、控制器，建议放控制器
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
