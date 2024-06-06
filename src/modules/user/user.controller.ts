import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { };

  @Get('list')
  // 用户列表
  list() {
    return this.userService.getList();
  }
}
