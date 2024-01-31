import {
    IsArray,
    IsOptional,
    IsString,
    MinLength,
    IsIn
  } from 'class-validator';
export class CreateServiceDto{
    @IsString()
    @MinLength(1)
    title: string;
  
    @IsString()
    description: string;
  
    @IsString()
    @IsOptional()
    slug?: string;
  
    @IsString({ each: true })
    @IsOptional()
    @IsIn(['Recomendado','Premium','Estandar','Nuevo'])
    tags?: string;
  
    @IsString()
    @IsOptional()
    image?: string; // Campo opcional para la URL de la imagen
}  