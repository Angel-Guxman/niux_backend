import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateSocialUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsIn(['google', 'facebook', 'microsoft'])
  source: string;

  @IsString()
  fullName: string;

  @IsString()
  @MinLength(6)
  socialId: string;

  @IsString()
  @IsOptional()
  picture: string;
}
