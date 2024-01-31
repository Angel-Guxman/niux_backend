import { Product } from 'src/products/entities';
import { Ticket } from 'src/tickets/entities';
import { Cart } from 'src/Cart/entities';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  email: string;

  @Column('text', {
    select: false,
    nullable: true,
  })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @Column('text', {
    default:
      'https://cdn.discordapp.com/attachments/701571845526126602/1176641823054241963/DALLE_2023-11-21_16.51.43_-_A_minimalist_default_profile_picture_for_an_ecommerce_website._The_design_should_be_extremely_simple_and_clean_featuring_a_solid_purple_background_w.png?ex=656f9c17&is=655d2717&hm=f2851f205bcec9691ddb493a86e19f9943209a4cebfa613c2c5a1636f8e73bbb&',
  })
  picture: string;

  @Column('text', {
    default: null,
    nullable: true,
  })
  source: string;

  @Column('text', {
    default: null,
    nullable: true,
  })
  socialId: string;

  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  ticket: Ticket;

  @OneToOne(() => Cart, (cart) => cart.user, { eager: true })
  cart: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order;

  @BeforeInsert()
  checkFields() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsOnUpdate() {
    this.email = this.email.toLowerCase().trim();
  }
}
