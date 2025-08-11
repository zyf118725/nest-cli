import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { Goods } from './entities/goods.entity';
import { formatError, formatPage, formatSuccess } from '../../util';
import { productlist } from '../../util/api';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

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
    console.log('===res: ', res);
    return formatSuccess(res);
  }

  /*
  file信息:  {
    fieldname: 'img',
    originalname: 'banner.png',
    encoding: '7bit',
    mimetype: 'image/png',
    size: 491390
  }
  */
  // 上传商品信息
  async addGoods({ params, file }) {
    console.log('====body: ', JSON.parse(JSON.stringify(params))); // { name: '张三' }
    console.log('====file: ', file);
    // 处理文件存放位置
    const publicDir = process.cwd() + '/public/upload';
    if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });
    const filePath = join(publicDir, `${Date.now()}-${file.originalname}`);
    // 写入文件
    const writeStream = createWriteStream(filePath);
    writeStream.write(file.buffer);

    return formatSuccess({
      txt: '上传图片成功',
      filePath: `/public/${filePath.split('public')[1]}`,
    });
  }
}
