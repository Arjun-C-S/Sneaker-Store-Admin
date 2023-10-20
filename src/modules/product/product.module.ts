import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './service/product.service';
import { ProductSchema } from './schema/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from '../category/schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
