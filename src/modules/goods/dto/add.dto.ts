import { IsNotEmpty, IsString } from 'class-validator'
export class AddDto {
  @IsNotEmpty({ message: '商品名不能为空' })//验证是否为空
  @IsString() //是否为字符串
  name: string;

  @IsNotEmpty({ message: '商品价格不能为空' })
  price: number
}