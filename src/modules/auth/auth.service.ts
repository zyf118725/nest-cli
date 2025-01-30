import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as md5 from 'md5';
import { JwtService } from '@nestjs/jwt';
import { formatError, formatSuccess } from 'src/util';
import { CreateUserDto } from '../user/dto/create-user.dto';
// import { RedisService } from '../redis/redis.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    // private redisService: RedisService,
    private configService: ConfigService,
  ) {}

  // 登录
  async signIn(createUserDto: CreateUserDto): Promise<any> {
    const user: any = await this.userService.findOne(createUserDto.name);
    if (!user) return formatError({ msg: '用户不存在' });
    if (user?.password !== md5(createUserDto.password)) return formatError({ msg: '密码错误' });
    // 生成token
    const payload = { id: user?.id, name: user?.name, password: user?.password };
    const token = await this.jwtService.signAsync(payload);
    // 将token存入redis
    // await this.redisService.set(`${this.configService.get('redis.prefix')}:token_${user?.id}`, token, 30 * 24 * 60 * 60 * 1000);
    return formatSuccess({
      token,
      userInfo: {
        id: user?.id,
        name: user?.name,
      },
    });
  }

  // 退出登录
  async logout(userid) {
    // this.redisService.del(`${this.configService.get('redis.prefix')}:token_${userid}`);
    return formatSuccess('logout success');
  }
}
