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
import { RedisModule } from './modules/redis/redis.module';
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
        console.log('configService', JSON.parse(JSON.stringify(configService)));
        return {
          type: 'mysql',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          synchronize: APP_ENV === 'production' ? false : true,
          // synchronize: true,
          // 自动引入实体
          autoLoadEntities: true,
          timezone: '+08:00', // 东八时区
          // timezone: "Asia/Shanghai"
        };
      },
      inject: [ConfigService],
    }),
    GoodsModule,
    UserModule,
    OrderModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
