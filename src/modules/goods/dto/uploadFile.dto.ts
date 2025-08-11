import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class UploadFileDto {
  @Column({ comment: '商品名称' })
  @ApiProperty({ description: '商品名称', required: false })
  name: string;

  @Column({ comment: '商品图片' })
  @ApiProperty({ description: '商品图片', required: false })
  img: File;
}
