import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Headers,
  ParseIntPipe,
} from '@nestjs/common';
// import { formatData } from '../util';
import { GoodsService } from './goods.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AddDto } from './dto/add.dto';
import { GoodsPipe } from './goods.pipe';

@Controller('goods')
@ApiTags('商品')
export class GoodsController {
  // 2. 初始化
  constructor(private goodsService: GoodsService) { };

  @Get()
  findAll(): string {
    return 'This action returns all goods';
  }

  // 查询
  @Get('list')
  @ApiOperation({ summary: "我是查询接口", description: "不需要token" })
  @ApiQuery({ name: "pageNum", description: "页码", required: true })
  async list(@Query() params: any) {
    // 3. 使用
    return this.goodsService.getList(params);
  }

  // 增加
  @Post('add')
  add(@Body(GoodsPipe) params: AddDto, @Headers() headers: any): any {
    console.log('params: ', params);
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
  delete(@Body('id', ParseIntPipe) id: number): any {
    return this.goodsService.delete(id);
  }

  // 获取详情信息
  @Get('/detail/:id')
  @ApiParam({ name: "id", description: "用户id", required: true })
  detail(@Param() params: any): any {
    console.log('params: ', params);
    return '获取详情信息';
  }
}
