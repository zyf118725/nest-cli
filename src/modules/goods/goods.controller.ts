import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Inject } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { formatSuccess, randomNum } from 'src/util';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@ApiBearerAuth()
@ApiTags('商品')
@Controller('goods')
export class GoodsController {
  constructor(
    private readonly goodsService: GoodsService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  /*
    查询商品 + 日志
    this.logger.info(message, obj, obj2, ...objN);

    // 普通日志
    this.logger.info(标题);
    // 带对象的日志
    this.logger.info(标题, { data: 对象 });

  */
  @Get()
  @Public()
  @ApiOperation({ summary: '查询-不鉴权', description: '查询' })
  findAll(@Query() params: any) {
    const num = randomNum();

    this.logger.info(`普通日志-${num}`);
    this.logger.info(`对象日志-${num}`, { data: { id: '111' } }, { data2: { id: '1112' } });
    this.logger.error('错误日志', { data: { msg: '我是错误日志', info: { id: 1, name: '张三' } } });
    return this.goodsService.findAll(params);
  }

  @Post()
  @ApiOperation({ summary: '新增', description: '新增' })
  create(@Body() createGoodDto: CreateGoodDto) {
    return this.goodsService.create(createGoodDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '详情', description: '详情' })
  @ApiQuery({ name: 'id', required: true, description: '商品id' })
  findOne(@Param('id') id: string) {
    console.log('id: ', id);
    return this.goodsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改', description: '修改' })
  update(@Param('id') id: string, @Body() updateGoodDto: UpdateGoodDto) {
    return this.goodsService.update(+id, updateGoodDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除', description: '删除' })
  remove(@Param('id') id: string) {
    return this.goodsService.remove(+id);
  }

  @Public()
  @Post('getThirdServe')
  @ApiOperation({ summary: 'z获取第三方数据' })
  async getThirdServe() {
    const res: any = await this.goodsService.getThirdServe();
    console.log('==z获取第三方数据 : ', res);
    return formatSuccess(res);
  }
}
