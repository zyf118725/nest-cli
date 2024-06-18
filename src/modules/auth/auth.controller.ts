import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 登录
  @Public()
  @Post('login')
  signIn(@Body() body) {
    console.log('body: ', body);
    return this.authService.signIn(body.name, body.password);
  }

  // 验证token是否正常
  @UseGuards(AuthGuard)
  @Get('testToken')
  testToken() {
    return '验证token是否正常-OK';
  }
}
