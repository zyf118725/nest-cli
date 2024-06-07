import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { formatSuccess, formatError, formatPage, } from '../../util';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    console.log('createUserDto: ', createUserDto);
    const data = await this.userRepository.save(createUserDto);
    return formatSuccess('新增成功');
  }
  async findAll(params) {
    const { pageNum, pageSize } = params;
    const data = await this.userRepository.findAndCount();
    console.log('data: ', data);
    return formatPage({ pageNum, pageSize, data });
  }

  async findOne(id: number) {
    console.log('id: ', id);
    const data = await this.userRepository.findOneBy({ id });
    console.log('data: ', data);
    return formatSuccess({ ...data });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = await this.userRepository.update({ id }, updateUserDto);
    console.log('data: ', data);
    if (data.affected > 0) {
      return formatSuccess('成功');
    } else {
      return formatError({ msg: '失败' })
    }
  }

  async remove(id: number) {
    const data = await this.userRepository.delete({ id });
    console.log('data: ', data);
    if (data.affected > 0) {
      return formatSuccess('成功');
    } else {
      return formatError({ msg: '失败' })
    }
  }
}
