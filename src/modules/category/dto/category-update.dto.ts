import { Type } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class CategoryDetailsDTO {
  @IsString()
  @Type(() => String)
  name: string;

  @IsString()
  @Type(() => String)
  @Length(10, 225)
  description: string;
}
