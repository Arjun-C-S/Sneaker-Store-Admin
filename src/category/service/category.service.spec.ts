import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryTable } from '../schema/category.schema';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let saveMock: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([CategoryTable])],
      providers: [CategoryService],
    })
      .overrideProvider(getRepositoryToken(CategoryTable))
      .useValue({
        create: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findOneBy: jest.fn(() => {
          return {
            id: 1,
            name: 'category name',
            description: 'category description',
          };
        }),
        find: jest.fn(() => {
          return [
            {
              id: 1,
              name: 'category name',
              description: 'category description',
            },
            {
              id: 2,
              name: 'category name',
              description: 'category description',
            },
          ];
        }),
      })
      .compile();

    categoryService = module.get<CategoryService>(CategoryService);
    saveMock = module.get(getRepositoryToken(CategoryTable)).save as jest.Mock;
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  describe('addCategory', () => {
    describe('success', () => {
      const categoryDetails = {
        name: 'category name',
        description: 'some category description',
      };
      it('should create a category successfully', () => {
        expect(categoryService.addCategory(categoryDetails)).toStrictEqual({
          message: 'category added successfully',
        });
      });
    });
  });

  describe('updateCategory', () => {
    describe('success', () => {
      const categoryId = 1;
      const categoryDetails = {
        name: 'category name',
        description: 'some category description',
      };
      it('should update a category successfully', () => {
        expect(
          categoryService.updateCategory(categoryId, categoryDetails),
        ).toStrictEqual({ message: 'category updated successfully' });
      });
    });
  });

  describe('removeCategory', () => {
    describe('success', () => {
      const categoryId = 1;
      it('should delete a category successfully', () => {
        expect(categoryService.removeCategory(categoryId)).toStrictEqual({
          message: 'category deleted successfully',
        });
      });
    });
  });

  describe('getCategory', () => {
    describe('success', () => {
      const categoryId = 1;
      it('should respond with a category', async () => {
        expect(await categoryService.getCategory(categoryId)).toStrictEqual({
          id: 1,
          name: 'category name',
          description: 'category description',
        });
      });
    });
  });

  describe('getAllCategories', () => {
    describe('success', () => {
      it('should respond with all category', async () => {
        expect(await categoryService.getAllCategories()).toStrictEqual([
          {
            id: 1,
            name: 'category name',
            description: 'category description',
          },
          {
            id: 2,
            name: 'category name',
            description: 'category description',
          },
        ]);
      });
    });
  });
});
