import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { Goods } from './entities/goods.entity';
import { formatError, formatPage, formatSuccess } from '../../util';
import { productlist } from '../../util/api';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods)
    private goodsEntity: Repository<Goods>,
  ) {}

  async create(createGoodDto: CreateGoodDto) {
    const data = await this.goodsEntity.save(createGoodDto);
    console.log('data: ', data);
    return formatSuccess('增加成功');
  }

  async findAll(params) {
    console.log('params: ', params);
    const pageNum = params.pageNum || 1;
    const pageSize = params.pageSize || 10;
    // 获取总条数
    const total = await this.goodsEntity.count({});
    // 查第几页的数据
    let list = [];
    if (total > 0) {
      list = await this.goodsEntity.find({
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        order: { create_time: 'DESC' },
      });
    }
    return formatPage({ pageNum, pageSize, total, list });
  }

  async findOne(id: number) {
    console.log('id: ', id);
    const data = await this.goodsEntity.findOneBy({ id });
    console.log('data: ', data);
    return formatSuccess({ ...data });
  }

  async update(id: number, updateGoodDto: UpdateGoodDto) {
    const data = await this.goodsEntity.update({ id }, updateGoodDto);
    console.log('data: ', data);
    if (data.affected > 0) {
      return formatSuccess('成功');
    } else {
      return formatError({ msg: '失败' });
    }
  }

  async remove(id: number) {
    const data = await this.goodsEntity.delete({ id });
    console.log('data: ', data);
    if (data.affected > 0) {
      return formatSuccess('成功');
    } else {
      return formatError({ msg: '失败' });
    }
  }

  // 获取第三方数据
  async getThirdServe() {
    const res: any = await productlist();
    return res;
  }
}
