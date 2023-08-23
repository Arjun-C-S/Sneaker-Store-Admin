import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './service/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryTable } from './schema/category.schema';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryTable])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
