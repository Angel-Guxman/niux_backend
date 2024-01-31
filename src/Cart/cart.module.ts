import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities';
import { CartItemModule } from 'src/cart-item/cart-item.module';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { ProductsService } from 'src/products/products.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [CartController],
  imports: [
    TypeOrmModule.forFeature([Cart]),
    forwardRef(() => CartItemModule),
    AuthModule,
    ProductsModule,
  ],
  providers: [CartService, AuthService, ProductsService],
  exports: [CartService],
})

export class CartModule {}
