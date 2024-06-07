import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'createTime',
    comment: '创建时间',
  })
  createTime: Date;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updateTime',
    comment: '更新时间',
  })
  updateTime: string;
}
