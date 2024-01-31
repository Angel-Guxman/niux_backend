import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Auth } from 'src/auth/decorators';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { AddProductDto } from './dto/add-product.dto';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { ProductsService } from 'src/products/products.service';
import { BadRequestException } from '@nestjs/common';
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly cartItemService: CartItemService,
    private readonly productService: ProductsService,
  ) {}

  @Post('/product')
  @Auth()
  async addProductToCart(
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
    @GetUser() user: User,
  ) {
    if (!quantity || !productId) {
      throw new BadRequestException(
        'El ID del producto y la cantidad son requeridos',
      );
    }

    // Intenta encontrar el carrito del usuario o crear uno si no existe
    let cart = await this.cartService.findCartUser(user.id);
    if (!cart) {
      // Si no se encuentra el carrito, crea uno nuevo para el usuario
      cart = await this.cartService.createCartForUser(user);
    }

    // Encuentra el producto
    const product = await this.productService.findProductById(productId);

    // Agrega el producto al carrito
    return this.cartItemService.addProductToCart(cart, product, quantity);
  }

  //aqui se crea el carrito del usuario
  @Get()
  @Auth()
  findOne(@GetUser() user: User) {
    return this.cartService.createCartForUser(user);
  }

  @Delete('delete-cart')
  @Auth()
  async deleteCart(@GetUser() user: User) {
    await this.cartService.remove(user.cart.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.update(id, updateCartDto);
  }

  /*  @Delete(':id')
      remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.cartService.remove(id);
      } */

  //eliminar productos del carrito
  @Delete('/:productId')
  @Auth()
  async removeOrDecreaseProduct(
    @Param('productId') productId: string,
    @GetUser() user: User, // Utiliza tu decorador personalizado para obtener el usuario
  ) {
    // El servicio necesita ahora el id del carrito, que se puede obtener del usuario
    // Y el id del producto a eliminar o disminuir
    await this.cartItemService.removeOrDecreaseProductFromCart(
      user.cart.id,
      productId,
    );
  }
  //obtener los productos del carrito del usuario loguedo
  @Get('/items')
  @Auth()
  getCartItems(@GetUser() user: User) {
    return this.cartService.getCartItems(user);
  }
}
