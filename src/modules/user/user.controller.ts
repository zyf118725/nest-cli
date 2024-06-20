import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '查询', description: '查询' })
  @ApiQuery({ name: 'pageNum', type: Number, required: false, description: '页码' })
  @ApiQuery({ name: 'pageSize', type: Number, required: false, description: '每页几条' })
  findAll(@Query() params: any) {
    return this.userService.findAll(params);
  }

  @Public()
  @Post()
  @ApiOperation({ summary: '注册', description: '新增用户' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':name')
  @ApiOperation({ summary: '详情', description: '详情' })
  findOne(@Param('name') name: string) {
    return this.userService.findOne(name);
  }

  // @Patch(':id')
  // @ApiOperation({ summary: '修改', description: '修改' })
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: '删除', description: '删除' })
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
