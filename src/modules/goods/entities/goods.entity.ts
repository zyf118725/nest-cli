import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Goods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '商品名称' })
  @IsNotEmpty({ message: '商品名称不能为空' })
  // 2. 使用
  @ApiProperty({ description: '商品名称' })
  name: string;

  @Column({ comment: '价格' })
  @IsNotEmpty({ message: '价格不能为空' })
  @ApiProperty({ description: '价格' })
  price: string;

  @Column({ comment: '备注' })
  @ApiProperty({ description: '备注', example: '备注信息', required: false })
  remark: string;

  @Column({ comment: '类型' })
  // 3.演示枚举
  @ApiProperty({
    description: '类型 1普通 2拼团商品',
    example: 1,
    required: false,
    enum: [1, 2],
  })
  type: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'create_time',
    comment: '创建时间',
  })
  create_time: Date;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'update_time',
    comment: '更新时间',
  })
  update_time: string;
}
