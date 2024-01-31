import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  description: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
