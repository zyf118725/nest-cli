import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Headers,
} from '@nestjs/common';
// import { formatData } from '../util';
// 1.引入
import { GoodsService } from './goods.service';

@Controller('goods')
export class GoodsController {
  // 2. 初始化
  constructor(private goodsService: GoodsService) { };

  @Get()
  findAll(): string {
    return 'This action returns all goods';
  }

  // 查询
  @Get('list')
  async list(@Query() params: any) {
    console.log('params: ', params);
    // 3. 使用
    return this.goodsService.getList(params);
  }

  // 增加
  @Post('add')
  add(@Body() params: any, @Headers() headers: any): any {
    console.log('headers: ', headers);
    console.log('body: ', params);
    return this.goodsService.add(params);
  }

  // 修改
  @Post('update')
  update(@Body() params: any): any {
    console.log('params: ', params);
    return this.goodsService.update(params);
  }

  // 删除
  @Post('delete')
  delete(@Body() params: any): any {
    console.log('params: ', params);
    return this.goodsService.delete(params);
  }

  // 获取详情信息
  @Get('/detail/:id')
  detail(@Param() params: any): any {
    console.log('params: ', params);
    return '获取详情信息';
  }
}
