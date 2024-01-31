import { IsInt, IsDecimal, Min, IsOptional } from 'class-validator';

export class UpdateCartItemDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly quantity?: number; // Cantidad del producto

  @IsOptional()
  @IsDecimal()
  @Min(0)
  readonly price?: number; // Precio del ítem en el carrito
}
