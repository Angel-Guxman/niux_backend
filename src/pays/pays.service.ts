import { Injectable } from '@nestjs/common';
import { configure, preferences, payment } from 'mercadopago';
import { PreferenceItem } from 'mercadopago/models/preferences/create-payload.model';
import { User } from 'src/auth/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { OrdersService } from 'src/orders/orders.service';
import { CartService } from 'src/Cart/cart.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class PaysService {
  constructor(
    private readonly authService: AuthService,
    private readonly ordersService: OrdersService,
    private readonly cartService: CartService,
    private readonly productsService: ProductsService,
  ) {}

  async createOrder(user: User, cart: any) {
    configure({
      access_token: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
    });

    const cartItems: PreferenceItem[] = cart.map((item) => {
      return {
        id: item.product.id,
        title: item.product.title,
        unit_price: item.product.price,
        currency_id: 'MXN',
        quantity: item.quantity,
      };
    });

    try {
      const respuesta = await preferences.create({
        items: cartItems,
        // auto_return: 'all',
        // notification_url: 'https://e720-190-237-16-208.sa.ngrok.io/webhook',
        back_urls: {
          success: `${process.env.HOST_APP}/order_summary`,
        },
        external_reference: user.id,
        notification_url:
          'https://9c20-187-150-12-112.ngrok.io/api/pays/webhook',
        // back_urls: {
        //   success: 'https://e720-190-237-16-208.sa.ngrok.io/success',
        //   pending: 'https://e720-190-237-16-208.sa.ngrok.io/pending',
        //   failure: 'https://e720-190-237-16-208.sa.ngrok.io/failure',
        // },
      });

      // console.log(user);

      return respuesta.body.init_point;
    } catch (error) {
      console.log(error);
    }
  }

  async webhook(body: any, type: any) {
    try {
      if (type === 'payment') {
        const respuesta = await payment.findById(body.id);
        console.log(respuesta.body.additional_info.items);
        if (respuesta.body.status === 'approved') {
          const getItems = respuesta.body.additional_info.items;

          const getUserId = respuesta.body.external_reference;

          const findUser = await this.authService.findUser(getUserId);
          const findCart = await this.cartService.findCartUser(findUser.id);

          const total = getItems.reduce(
            (acc: number, item: { unit_price: number; quantity: number }) => {
              return acc + +item.unit_price * +item.quantity;
            },
            0,
          );

          const products = getItems.map((item: { id: string }) => {
            return item.id;
          });

          const quantity = getItems.map((item: { quantity: number }) => {
            return +item.quantity;
          });

          const OrderBody = {
            products,
            quantity,
            total,
          };

          await this.ordersService.create(OrderBody, findUser);
          await this.cartService.remove(findCart.id);

          getItems.map(async (product: { id: string; quantity: number }) => {
            const findProduct = await this.productsService.findOne(product.id);
            const newStock = findProduct.stock - product.quantity;
            await this.productsService.update(
              product.id,
              { stock: newStock },
              findUser,
            );
          });
        }
      }
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong');
    }
  }
}
