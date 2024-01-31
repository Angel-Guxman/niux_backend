import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/products/entities';

@Entity({ name: 'order_products' })
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts, { eager: true })
  product: Product;
}
