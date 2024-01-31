import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { ProductsModule } from '../products/products.module';
import { CartModule } from 'src/Cart/cart.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]), forwardRef(() => CartModule), ProductsModule],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService,TypeOrmModule],
})
export class CartItemModule {}
