import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { OrderProduct } from './order-products.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  @Column('text', {
    default: 'pending',
  })
  status: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: {
      to(data: number): number {
        return data;
      },
      from(data: string): number {
        return parseFloat(data);
      },
    },
  })
  total: number;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    eager: true,
    cascade: true,
  })
  orderProducts: OrderProduct[];

  @CreateDateColumn()
  createdAt: Date;
}
