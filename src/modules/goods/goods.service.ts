import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Goods } from '../../entities/goods.entity';
import { formatError, formatPage, formatSuccess } from '../../util';
@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods)
    private goodsEntity: Repository<Goods>,
  ) { }

  // 查询
  async getList(params) {
    const { pageNum, pageSize } = params;
    const data = await this.goodsEntity.findAndCount();
    console.log('data: ', data);
    return formatPage({ pageNum, pageSize, data });
  }

  // 增加
  async add(params) {
    const data = await this.goodsEntity.save(params);
    console.log('data: ', data);
    return formatSuccess('增加成功');
  }

  // 修改
  async update(params) {
    params.id = parseInt(params.id)
    // const data = await this.goodsEntity.save(params);
    const data = await this.goodsEntity.update({ id: params.id }, params);
    console.log('data: ', data);
    if (data.affected > 0) {
      return formatSuccess('成功');
    } else {
      return formatError({ msg: '失败' })
    }
  }

  // 删除
  async delete(params) {
    const id = parseInt(params.id);
    const data = await this.goodsEntity.delete({ id });
    console.log('data: ', data);
    if (data.affected > 0) {
      return formatSuccess('成功');
    } else {
      return formatError({ msg: '失败' })
    }
  }

}
/*

*/
