import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 登录
  @Public()
  @ApiOperation({ summary: '登录', description: '登录' })
  @Post('login')
  signIn(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto: ', createUserDto);
    return this.authService.signIn(createUserDto);
  }

  // 验证token是否正常
  @ApiOperation({ summary: '检测登录', description: '登录' })
  @UseGuards(AuthGuard)
  @Get('testToken')
  testToken() {
    return '验证token是否正常-OK';
  }

  @Public()
  @ApiOperation({ summary: '检测', description: '检测' })
  @Get('test')
  test() {
    return '检验接口';
  }
}
