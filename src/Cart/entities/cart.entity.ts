import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { CartItem } from '../../cart-item/entities/cart-item.entity';

@Entity({ name: 'cart' })
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn({ name: 'userid' })
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    cascade:true,
    eager: true,
  })
  items: CartItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('numeric', {
    default: 0.0,
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
  totalAmount: number;

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.getTotalPrice(), 0);
  }
}
