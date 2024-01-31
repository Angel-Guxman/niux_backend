import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { Cart } from './entities';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { User } from 'src/auth/entities/user.entity';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CartService {
  private readonly logger = new Logger('CartService');
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly cartItemService: CartItemService,
    private readonly productService: ProductsService,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async createCartForUser(user: User) {
    try {
      console.log(User);
      let cart = await this.cartRepository.findOne({
        where: { user: { id: user.id } },
      });

      if (!cart) {
        cart = this.cartRepository.create({ user: user });
      }

      return await this.cartRepository.save(cart);
    } catch (error) {
      this.handleDBExceptions(error);
      throw error;
    }
  }

  async addProductToCart(
    cartId: string,
    productId: string,
    quantity: number,
  ): Promise<CartItem> {
    try {
      const cart = await this.cartRepository.findOneBy({ id: cartId });
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      const product = await this.productService.findProductById(productId);
      if (!product) {
        throw new Error('Producto no encontrado');
      }

      // Agregar el producto al carrito
      return await this.cartItemService.addProductToCart(
        cart,
        product,
        quantity,
      );
    } catch (error) {
      this.handleDBExceptions(error);
      throw error;
    }
  }

  async findCartUser(userid: string) {
    // Intenta mostrar el carrito y los productos que tiene
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userid } },
    });

    return cart;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.cartRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`The id ${id} is not a valid UUID.`);
    }
    const cart = await this.cartRepository.findOneBy({ id });
    if (!cart) {
      throw new NotFoundException(`Cart with id ${id} not found!`);
    }
    return cart;
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const cart = await this.cartRepository.preload({ id, ...updateCartDto });
    if (!cart) throw new NotFoundException(`Cart with id ${id} not found!`);
    await this.cartRepository.save(cart);
    return cart;
  }

  async remove(id: string) {
    const { affected } = await this.cartRepository.delete(id);
    if (affected === 0) {
      throw new NotFoundException(`Cart with id ${id} not found!`);
    }
    return `Cart with id ${id} was deleted successfully.`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error occurred. Check server logs for details.',
    );
  }
  async findOrCreateCart(id: string, user: User): Promise<Cart> {
    let cart = await this.cartRepository.findOneBy({ id });
    if (!cart) {
      cart = this.cartRepository.create({ user: user });
      await this.cartRepository.save(cart);
    }

    return cart;
  }

  async getCartItems(user: User): Promise<CartItem[]> {
    if (!user.cart) {
      throw new NotFoundException('No cart found for the given user');
    }

    const userCart = this.cartItemRepository.find({
      where: {
        cart: { id: user.cart.id },
      },

      relations: {
        product: true,
      },
    });

    (await userCart).sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA - dateB;
    });

    return userCart;
  }

  async sumTotalAmountCart(cartId: string, totalAmount: number) {
    const cart = await this.cartRepository.findOneBy({ id: cartId });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    cart.totalAmount = cart.totalAmount + totalAmount;
    await this.cartRepository.save(cart);
  }

  async resTotalAmountCart(cartId: string, productPrice: number) {
    const cart = await this.cartRepository.findOneBy({ id: cartId });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    if (cart.items.length === 0) {
      cart.totalAmount = 0;
      return await this.cartRepository.save(cart);
    } else {
      cart.totalAmount = cart.totalAmount - productPrice;
      await this.cartRepository.save(cart);
    }
  }
}
