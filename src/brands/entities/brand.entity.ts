import { Product } from 'src/products/entities';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'brands' })
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  name: string;

  @Column('text')
  description: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => Product, (product) => product.category)
  product: Product;

  @BeforeInsert()
  beforeInsert() {
    this.name = this.name.toLowerCase().trim();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.name = this.name.toLocaleLowerCase().trim();
  }
}
