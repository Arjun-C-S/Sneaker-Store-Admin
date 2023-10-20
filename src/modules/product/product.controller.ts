import { Body, Controller, Post, Put, Param, Delete, Get } from '@nestjs/common';
import { ProductService } from './service/product.service';
import { ProductDetailsDTO } from './dto/add-product.dto';
import { UpdateProductDetailsDTO } from './dto/update-product.dto';
import { ProductDocument } from './schema/product.schema';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  addCategory(@Body() productDetails: ProductDetailsDTO): Promise<{
    message: string;
  }> {
    return this.productService.addProduct(productDetails);
  }

  @Put('/:productId')
  updateCategory(
    @Param('productId') productId: number,
    @Body() updateProductDetails: UpdateProductDetailsDTO,
  ): Promise<{
    message: string;
  }> {
    return this.productService.updateProduct(productId, updateProductDetails);
  }

  @Delete('/:productId')
  removeCategory(@Param('productId') productId: number): Promise<{ message: string }> {
    return this.productService.removeProduct(productId);
  }

  @Get('/:productId')
  async getCategory(@Param('productId') productId: number): Promise<ProductDocument> {
    return await this.productService.getProduct(productId);
  }

  @Get()
  async getAllProducts(): Promise<ProductDocument[]> {
    return await this.productService.getAllProducts();
  }
}
