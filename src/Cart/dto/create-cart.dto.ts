import {
    IsArray,
    IsInt,
    IsOptional,
    IsPositive,
    IsString,
    MinLength,
    IsDate
  } from 'class-validator';
export class CreateCartDto{

  @IsString()
  readonly id: string; // UUID del carrito

  @IsString()
  readonly userId: string; // UUID del usuario asociado al carrito

  // Aquí puedes incluir otros campos que consideres necesarios para transferir
  // Por ejemplo, podrías querer transferir un resumen de los items del carrito

  @IsDate()
  readonly createdAt: Date; // Fecha de creación del carrito

  @IsDate()
  readonly updatedAt: Date; // Fecha de última actualización del carrito

  // Puedes incluir métodos adicionales si es necesario
  // Por ejemplo, para calcular el total de los items en el DTo

  
}  