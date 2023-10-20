import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CategoryDetailsDTO } from '../dto/category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryModel, CategoryDocument } from '../schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private readonly categoryModel: CategoryModel) {}

  async addCategory(categoryDetails: CategoryDetailsDTO): Promise<{ message: string }> {
    try {
      const category: CategoryDocument = new this.categoryModel(categoryDetails);
      await category.save();
      return { message: 'category added successfully' };
    } catch (error) {
      throw new UnprocessableEntityException('category not created', {
        cause: error,
      });
    }
  }

  async updateCategory(categoryId: number, categoryDetails: CategoryDetailsDTO): Promise<{ message: string }> {
    try {
      const category = await this.categoryModel.findOne({ id: categoryId });
      if (!category) {
        throw new NotFoundException(`Category not found | <CategoryId: ${categoryId}>`);
      }

      await this.categoryModel.findOneAndUpdate({ id: categoryId }, categoryDetails, {
        new: true,
      });
      return { message: 'category updated successfully' };
    } catch (error) {
      throw error;
    }
  }

  async removeCategory(categoryId: number): Promise<{ message: string }> {
    try {
      const category = await this.categoryModel.findOne({ id: categoryId });
      if (!category) {
        throw new NotFoundException(`Category not found | <CategoryId: ${categoryId}>`);
      }

      await this.categoryModel.deleteOne({ categoryId });
      return { message: 'category deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async getCategory(categoryId: number): Promise<CategoryDocument> {
    try {
      const category = await this.categoryModel.findOne({ id: categoryId });
      if (!category) {
        throw new NotFoundException(`Category not found | <CategoryId: ${categoryId}>`);
      }
      return category;
    } catch (error) {
      throw error;
    }
  }

  async getAllCategories(): Promise<CategoryDocument[]> {
    try {
      return await this.categoryModel.find();
    } catch (error) {
      throw error;
    }
  }
}
