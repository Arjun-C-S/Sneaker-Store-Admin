import { Body, Controller, Param, Post, Put, Delete, Get } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CategoryDetailsDTO } from './dto/category.dto';
import { ApiTags } from '@nestjs/swagger';
import { CategoryDocument } from './schema/category.schema';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  addCategory(@Body() categoryDetails: CategoryDetailsDTO): Promise<{ message: string }> {
    return this.categoryService.addCategory(categoryDetails);
  }

  @Put('/:categoryId')
  updateCategory(
    @Param('categoryId') categoryId: number,
    @Body() categoryDetails: CategoryDetailsDTO,
  ): Promise<{ message: string }> {
    return this.categoryService.updateCategory(categoryId, categoryDetails);
  }

  @Delete('/:categoryId')
  removeCategory(@Param('categoryId') categoryId: number): Promise<{ message: string }> {
    return this.categoryService.removeCategory(categoryId);
  }

  @Get('/:categoryId')
  async getCategory(@Param('categoryId') categoryId: number): Promise<CategoryDocument> {
    return await this.categoryService.getCategory(categoryId);
  }

  @Get()
  async getAllCategories(): Promise<CategoryDocument[]> {
    return await this.categoryService.getAllCategories();
  }
}
