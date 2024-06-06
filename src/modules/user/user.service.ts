import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { formatData, formatSuccess } from '../../util'


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async getList() {
    const res = await this.usersRepository.findAndCount();
    return formatSuccess(res[0]);
  }
}
