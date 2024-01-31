import { IsBoolean, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(3)
  name: string;

  @MinLength(20)
  description: string;

  @IsBoolean()
  isActive: boolean;
}
