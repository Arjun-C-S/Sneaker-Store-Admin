import { Type } from 'class-transformer';
import { IsNumber, IsString, Length } from 'class-validator';

export class ProductDetailsDTO {
  @IsNumber()
  @Type(() => Number)
  categoryId: number;

  @IsString()
  @Type(() => String)
  name: string;

  @IsString()
  @Type(() => String)
  @Length(10, 225)
  description: string;

  @IsString()
  @Type(() => String)
  price: string;

  @IsString()
  @Type(() => String)
  prepareTime: string;

  @IsNumber()
  @Type(() => Number)
  pieces: number;
}
