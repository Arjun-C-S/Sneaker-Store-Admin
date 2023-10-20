import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CategoryDetailsDTO } from '../dto/category-update.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryModel, CategoryDocument } from '../schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: CategoryModel,
  ) {}

  addCategory(categoryDetails: CategoryDetailsDTO) {
    try {
      const category: CategoryDocument = new this.categoryModel(
        categoryDetails,
      );
      category.save();
      return { message: 'category added successfully' };
    } catch (error) {
      throw new UnprocessableEntityException('category not created', {
        cause: error,
      });
    }
  }

  updateCategory(categoryId: number, categoryDetails: CategoryDetailsDTO) {
    try {
      this.categoryModel.findOneAndUpdate({ categoryId }, categoryDetails, {
        new: true,
      });
      return { message: 'category updated successfully' };
    } catch (error) {
      throw new UnprocessableEntityException('category not updated', {
        cause: error,
      });
    }
  }

  removeCategory(categoryId: number) {
    try {
      this.categoryModel.deleteOne({ categoryId });
      return { message: 'category deleted successfully' };
    } catch (error) {
      throw new UnprocessableEntityException('category not deleted', {
        cause: error,
      });
    }
  }

  async getCategory(categoryId: number) {
    return await this.categoryModel.findById({ id: categoryId });
  }

  async getAllCategories() {
    return await this.categoryModel.find();
  }
}
