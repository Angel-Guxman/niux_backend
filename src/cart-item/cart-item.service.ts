import { Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { ProductsService } from 'src/products/products.service';
import { CartService } from 'src/Cart/cart.service';
import { Inject } from '@nestjs/common';
import { Cart } from 'src/Cart/entities';
import { Product } from 'src/products/entities';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly productService: ProductsService,
    @Inject(forwardRef(() => CartService))
    private readonly cartService: CartService,
  ) {}

  async findAll() {
    return await this.cartItemRepository.find();
  }

  // Buscar un ítem específico en el carrito por ID
  async findOne(cartItemId: string): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOneBy({
      id: cartItemId,
    });
    if (!cartItem) {
      throw new Error('Ítem de carrito no encontrado');
    }
    return cartItem;
  }

  async create(cartItemData: CreateCartItemDto) {
    const cartItem = this.cartItemRepository.create(cartItemData);
    await this.cartItemRepository.save(cartItem);
    return cartItem;
  }

  async update(id: string, updateData: UpdateCartItemDto) {
    const cartItem = await this.cartItemRepository.preload({
      id: id,
      ...updateData,
    });
    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID "${id}" not found`);
    }
    await this.cartItemRepository.save(cartItem);
    return cartItem;
  }

  async remove(id: string) {
    const result = await this.cartItemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cart item with ID "${id}" not found`);
    }
  }

  private async findOrCreateCartItem(
    cartId: string,
    productId: string,
    quantity: number,
  ): Promise<CartItem> {
    // Buscar un CartItem existente que coincida con el cartId y productId
    let cartItem = await this.cartItemRepository.findOne({
      where: {
        cart: { id: cartId },
        product: { id: productId },
      },
    });

    // Si el CartItem existe, actualiza su cantidad
    if (cartItem) {
      cartItem.quantity += quantity;
      await this.cartItemRepository.save(cartItem);
    } else {
      // Si no existe, crea un nuevo CartItem
      cartItem = this.cartItemRepository.create({
        cart: { id: cartId },
        product: { id: productId },
        quantity: quantity,
      });
      await this.cartItemRepository.save(cartItem);
    }

    return cartItem;
  }

  async addProductToCart(
    cart: Cart,
    product: Product,
    quantity: number,
  ): Promise<CartItem> {
    // Buscar si el ítem ya existe en el carrito
    let cartItem = await this.cartItemRepository.findOne({
      where: {
        cart: { id: cart.id },
        product: { id: product.id },
      },
    });

    if (cartItem) {
      // Si el ítem ya existe, actualizar la cantidad
      cartItem.quantity += quantity;
      // Asegúrate de que estás asignando el precio por unidad al campo 'price'
      cartItem.price = product.price; // Esto debería ser el precio por unidad
      // Actualizar el precio total

      cartItem.totalPrice = cartItem.price * cartItem.quantity;

      await this.cartService.sumTotalAmountCart(cart.id, product.price);
    } else {
      cartItem = this.cartItemRepository.create({
        cart,
        product,
        quantity,
        price: product.price,
        totalPrice: product.price * quantity,
      });

      const getTotal =
        cartItem.quantity >= 2 ? cartItem.totalPrice : cartItem.price;

      await this.cartService.sumTotalAmountCart(cart.id, getTotal);
    }

    await this.cartItemRepository.save(cartItem);
    return cartItem;
  }

  async removeOrDecreaseProductFromCart(
    cartId: string,
    productId: string,
  ): Promise<void> {
    // Encontrar el ítem del carrito basado en el cartId y productId
    const cartItem = await this.cartItemRepository.findOne({
      where: {
        cart: { id: cartId },
        product: { id: productId },
      },
      relations: {
        cart: true,
        product: true,
      },
    });

    if (!cartItem) {
      throw new Error('Ítem del carrito no encontrado');
    }

    if (cartItem.quantity > 1) {
      await this.cartService.resTotalAmountCart(cartId, cartItem.price);
      cartItem.quantity -= 1;
      cartItem.updateTotalPrice(); // Actualiza el precio total con la nueva cantidad

    } else {
      // Si solo hay un producto, eliminar el ítem del carrito
      await this.cartService.resTotalAmountCart(cartId, cartItem.price);
      await this.cartItemRepository.remove(cartItem);
      return; // No hay necesidad de guardar después de eliminar
    }

    await this.cartItemRepository.save(cartItem); // Guardar los cambios, incluyendo el precio total actualizado}
  }
}
