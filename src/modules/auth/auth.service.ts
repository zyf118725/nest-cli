import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
// 1. 导入jwt
import { JwtService } from '@nestjs/jwt';
import { formatError, formatSuccess } from 'src/util';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // 登录
  async signIn(username: string, pass: string): Promise<any> {
    const user: any = await this.userService.findOne(username);
    if (!user) return formatError({ msg: '用户名错误' });
    if (user?.password !== pass) return formatError({ msg: '密码错误' });
    // 2. 生成token
    const payload = { username: user?.username, password: user?.password };
    const token = await this.jwtService.signAsync(payload);
    return formatSuccess({
      name: user?.name,
      token,
    });
  }
}
