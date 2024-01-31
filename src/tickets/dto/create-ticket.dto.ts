import {
    IsArray,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MinLength,
    IsIn,
  } from 'class-validator';
export class CreateTicketDto{
    @IsString()
    @MinLength(2)
    applicant: string;


    @IsString()
    @MinLength(1)
    title: string;
  
    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    openingdate?:string;

    @IsString()
    type: string;

    @IsString()
    @IsOptional()
    category?: string;
  
    @IsString()
    @IsOptional()
  
    state?: string;

    @IsString()
    @IsOptional()

    location?: string;
  
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];
  
    @IsNumber()
    @IsPositive()
    @IsOptional()
    rating?: number;
  

}  