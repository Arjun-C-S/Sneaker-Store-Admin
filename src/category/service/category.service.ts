import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryTable } from '../schema/category.schema';
import { Repository } from 'typeorm';
import { CategoryDetailsDTO } from '../dto/category-update.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryTable)
    private categoryTable: Repository<CategoryTable>,
  ) {}

  addCategory(categoryDetails: CategoryDetailsDTO) {
    try {
      const category = this.categoryTable.create(categoryDetails);
      this.categoryTable.save(category);
      return { message: 'category added successfully' };
    } catch (error) {
      throw new UnprocessableEntityException('category not created', {
        cause: error,
      });
    }
  }

  async updateCategory(
    categoryId: number,
    categoryDetails: CategoryDetailsDTO,
  ) {
    try {
      this.categoryTable.update(categoryId, categoryDetails);
      return { message: 'category updated successfully' };
    } catch (error) {
      throw new UnprocessableEntityException('category not updated', {
        cause: error,
      });
    }
  }

  async removeCategory(categoryId: number) {
    try {
      this.categoryTable.delete(categoryId);
      return { message: 'category deleted successfully' };
    } catch (error) {
      throw new UnprocessableEntityException('category not deleted', {
        cause: error,
      });
    }
  }

  async getCategory(categoryId: number) {
    return await this.categoryTable.findOneBy({ id: categoryId });
  }

  async getAllCategories() {
    return await this.categoryTable.find();
  }
}
