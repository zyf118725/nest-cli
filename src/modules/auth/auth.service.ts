import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as md5 from 'md5';
import { JwtService } from '@nestjs/jwt';
import { formatError, formatSuccess } from 'src/util';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // 登录
  async signIn(createUserDto: CreateUserDto): Promise<any> {
    const user: any = await this.userService.findOne(createUserDto.name);
    if (!user) return formatError({ msg: '用户不存在' });
    if (user?.password !== md5(createUserDto.password)) return formatError({ msg: '密码错误' });
    // 生成token
    const payload = { username: user?.username, password: user?.password };
    const token = await this.jwtService.signAsync(payload);
    return formatSuccess({
      token,
      userInfo: {
        id: user?.id,
        name: user?.name,
      },
    });
  }
}
