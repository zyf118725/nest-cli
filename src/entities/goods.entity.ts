import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Goods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'createAt',
    comment: '创建时间',
  })
  createAt: Date;

  @Column()
  updateAt: string;
}
