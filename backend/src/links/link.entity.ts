import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity()
export class Link extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  url: string = '';

  @Column()
  label: string = '';

  @Column()
  order: number = 0;

  @ManyToOne(() => Category, (category) => category.links, { eager: true })
  category: Category | undefined;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
