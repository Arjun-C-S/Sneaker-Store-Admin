import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, ProductModel } from '../schema/product.schema';
import { ProductDetailsDTO } from '../dto/add-product.dto';
import { UpdateProductDetailsDTO } from '../dto/update-product.dto';
import { CategoryModel } from 'src/modules/category/schema/category.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: ProductModel,
    @InjectModel('Category') private readonly categoryModel: CategoryModel,
  ) {}

  async addProduct(productDetails: ProductDetailsDTO): Promise<{
    message: string;
  }> {
    try {
      const product: ProductDocument = new this.productModel(productDetails);
      await product.save();
      return { message: 'Product added successfully' };
    } catch (error) {
      throw new UnprocessableEntityException('Product not created', {
        cause: error,
      });
    }
  }

  async updateProduct(
    productId: number,
    updateProductDetails: UpdateProductDetailsDTO,
  ): Promise<{
    message: string;
  }> {
    try {
      const product = await this.productModel.findOne({ id: productId });
      if (!product) {
        throw new NotFoundException(`Product not found | <ProductId: ${productId}>`);
      }

      const category = await this.categoryModel.findOne({
        id: updateProductDetails.categoryId,
      });
      if (!category) {
        throw new NotFoundException(`Category not found | <CategoryId: ${updateProductDetails.categoryId}>`);
      }

      await this.productModel.findOneAndUpdate({ id: productId }, updateProductDetails, {
        new: true,
      });
      return { message: 'product updated successfully' };
    } catch (error) {
      throw error;
    }
  }

  async removeProduct(productId: number): Promise<{ message: string }> {
    try {
      const product = await this.productModel.findOne({ id: productId });
      if (!product) {
        throw new NotFoundException(`Product not found | <ProductId: ${productId}>`);
      }

      await this.productModel.deleteOne({ id: productId });
      return { message: 'product deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async getProduct(productId: number): Promise<ProductDocument> {
    try {
      const product = await this.productModel.findOne({ id: productId });
      if (!product) {
        throw new NotFoundException(`Product not found | <ProductId: ${productId}>`);
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts(): Promise<ProductDocument[]> {
    try {
      return await this.productModel.find();
    } catch (error) {
      throw error;
    }
  }
}
