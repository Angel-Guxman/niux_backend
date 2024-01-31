import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { FilesModule } from './files/files.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';
import { ServicesModule } from './services/services.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { CartModule } from './Cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { MulterModule } from '@nestjs/platform-express';
import { PaysModule } from './pays/pays.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    MulterModule.register({
      dest: './uploads', // Directorio donde se guardarán las imágenes
    }),
    ProductsModule,
    FilesModule,
    ServicesModule,
    TicketsModule,
    SeedModule,
    AuthModule,
    CategoriesModule,
    BrandsModule,
    CartModule,
    CartItemModule,
    PaysModule,
    OrdersModule,
  ],
})
export class AppModule {}
