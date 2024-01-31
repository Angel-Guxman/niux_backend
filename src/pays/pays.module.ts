import { Module } from '@nestjs/common';
import { PaysService } from './pays.service';
import { PaysController } from './pays.controller';
import { AuthModule } from 'src/auth/auth.module';
import { OrdersModule } from 'src/orders/orders.module';
import { CartModule } from '../Cart/cart.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [PaysController],
  providers: [PaysService],
  imports: [AuthModule, OrdersModule, CartModule, ProductsModule]
})
export class PaysModule {}
