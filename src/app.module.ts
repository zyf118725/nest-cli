import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoodsModule } from './modules/goods/goods.module';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { AuthModule } from './modules/auth/auth.module';
import { WinstonModule } from 'nest-winston';
import winstonLogger from './config/winston.logger';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './util/exception.filter';
// import { RedisModule } from './modules/redis/redis.module';

// 处理环境变量
const envFilePath = ['.env'];
const APP_ENV = process.env.APP_ENV;
if (APP_ENV === 'production') envFilePath.unshift(`.env.${APP_ENV}`);
console.log('app.module-APP_ENV====: ', APP_ENV);

@Module({
  imports: [
    /** 环境变量配置 */
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config], // 加载自定义config
      envFilePath,
    }),
    // 数据库连接
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        // console.log('== app.module: configService', JSON.parse(JSON.stringify(configService)));
        return {
          type: 'mysql',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          // synchronize: APP_ENV === 'production' ? false : true,
          synchronize: false,
          // 自动引入实体
          autoLoadEntities: true,
          timezone: '+08:00', // 东八时区
          // timezone: "Asia/Shanghai"
        };
      },
      inject: [ConfigService],
    }),
    // 注册日志记录文件
    WinstonModule.forRoot({
      transports: winstonLogger.transports,
      format: winstonLogger.format,
      defaultMeta: winstonLogger.defaultMeta,
      exitOnError: false, // 防止意味退出
    }),
    GoodsModule,
    UserModule,
    OrderModule,
    AuthModule,
    // RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER, // 使用 APP_FILTER 令牌
      useClass: AllExceptionsFilter, // 指定要使用的过滤器类
    },
  ],
})
export class AppModule {}
