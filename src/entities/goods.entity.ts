import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Goods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  createAt: string;

  @Column()
  updateAt: string;
}
