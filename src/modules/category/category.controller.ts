import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Delete,
  Get,
} from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CategoryDetailsDTO } from './dto/category-update.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  addCategory(@Body() categoryDetails: CategoryDetailsDTO) {
    return this.categoryService.addCategory(categoryDetails);
  }

  @Put('/:categoryId')
  updateCategory(
    @Param('categoryId') categoryId: number,
    @Body() categoryDetails: CategoryDetailsDTO,
  ) {
    return this.categoryService.updateCategory(categoryId, categoryDetails);
  }

  @Delete('/:categoryId')
  removeCategory(@Param('categoryId') categoryId: number) {
    return this.categoryService.removeCategory(categoryId);
  }

  @Get('/:categoryId')
  async getCategory(@Param('categoryId') categoryId: number) {
    return await this.categoryService.getCategory(categoryId);
  }

  @Get()
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }
}
