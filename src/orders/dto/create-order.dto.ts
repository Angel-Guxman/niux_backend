import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  @IsIn([
    'pending',
    'completed',
    'cancelled',
    'refunded',
    'failed',
    'processing',
  ])
  status?: string;

  @IsPositive()
  @IsNumber()
  total: number;

  @IsString({ each: true })
  @IsArray()
  products: string[];

  @IsNumber({}, { each: true })
  @IsArray()
  quantity: number[];
}
