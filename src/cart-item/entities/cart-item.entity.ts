import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Cart } from 'src/Cart/entities';
import { Product } from 'src/products/entities';

@Entity({ name: 'cart_item' })
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cart, (cart) => cart.items, {
    onDelete: 'CASCADE',
  })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Product;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

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
  price: number;

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
  totalPrice: number;

  getTotalPrice(): number {
    return this.quantity * this.price;
  }

  updateTotalPrice(): void {
    this.totalPrice = this.quantity * this.price;
  }

 
}
