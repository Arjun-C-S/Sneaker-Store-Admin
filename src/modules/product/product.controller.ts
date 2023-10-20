import { Body, Controller, Post, Put, Param } from '@nestjs/common';
import { ProductService } from './service/product.service';
import { ProductDetailsDTO } from './dto/add-product.dto';
import { UpdateProductDetailsDTO } from './dto/update-product.dto';

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
}
