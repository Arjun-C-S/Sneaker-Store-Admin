import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateProductDetailsDTO {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId: number;

  @IsOptional()
  @IsString()
  @Type(() => String)
  name: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Length(10, 225)
  description: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  price: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  prepareTime: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pieces: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  inStock: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive: boolean;
}
