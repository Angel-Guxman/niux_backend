import {
  IsBoolean,
  IsDate,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  id?: number;

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

  @IsNumber()
  @IsOptional()
  @IsPositive()
  total?: number;

  @IsOptional()
  createdAt?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

}
