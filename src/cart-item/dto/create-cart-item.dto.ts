import { IsUUID, IsInt, IsDecimal, Min, IsNotEmpty } from 'class-validator';

export class CreateCartItemDto {
  @IsUUID()
  @IsNotEmpty()
  readonly cartId: string; // ID del carrito al que pertenece el ítem

  @IsUUID()
  @IsNotEmpty()
  readonly productId: string; // ID del producto

  @IsInt()
  @Min(1)
  readonly quantity: number; // Cantidad del producto

  @IsDecimal()
  @Min(0)
  readonly price: number; // Precio del ítem en el carrito
}
