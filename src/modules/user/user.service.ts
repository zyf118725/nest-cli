import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { formatSuccess, formatError, formatPage } from '../../util';
import * as md5 from 'md5';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userinfo = await this.findOne(createUserDto.name);
    if (userinfo) return formatError({ msg: '用户名已存在' });
    createUserDto.password = md5(createUserDto.password);
    const data = await this.userRepository.save(createUserDto);
    return formatSuccess('新增成功');
  }

  async findAll(params) {
    console.log('params: ', params);
    const pageNum = params.pageNum || 1;
    const pageSize = params.pageSize || 10;
    // 查询条件
    const where: any = {};
    if (params?.level) where.level = params?.level;

    // 获取总条数
    const total = await this.userRepository.count({ where });
    // 查第几页的数据
    let list = [];
    if (total > 0) {
      list = await this.userRepository.find({
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        where,
        order: { create_time: 'DESC' },
      });
    }
    return formatPage({ pageNum, pageSize, total, list });
  }

  // 通过用户名查找用户信息
  async findOne(username: string) {
    const data = await this.userRepository.findOneBy({ name: username });
    return data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = await this.userRepository.update({ id }, updateUserDto);
    console.log('data: ', data);
    if (data.affected > 0) {
      return formatSuccess('成功');
    } else {
      return formatError({ msg: '失败' });
    }
  }

  async remove(id: number) {
    const data = await this.userRepository.delete({ id });
    console.log('data: ', data);
    if (data.affected > 0) {
      return formatSuccess('成功');
    } else {
      return formatError({ msg: '失败' });
    }
  }
}
