import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt'


@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const data: any = await this.userService.login(createUserDto);
    console.log('data: ', data);
    const token = this.jwtService.sign({
      username: createUserDto.name,
      password: createUserDto?.password
    })
    console.log('token: ', token);
    data.data.token = token;
    console.log('data: ', data);
    return data;
    return token
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() params: any) {
    return this.userService.findAll(params);
  }
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.userService.findOne(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
