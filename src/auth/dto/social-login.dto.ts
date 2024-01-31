import { IsEmail, IsString, MinLength } from 'class-validator';

export class SocialLoginDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  socialId: string;

  @IsString()
  @MinLength(6)
  source: string;
}
