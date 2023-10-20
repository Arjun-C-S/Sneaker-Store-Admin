import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getModelToken } from '@nestjs/mongoose';

describe('ProductService', () => {
  let service: ProductService;

  const categoryModel = {
    create: jest.fn(),
  };

  const productModel = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken('Category'),
          useValue: categoryModel,
        },
        {
          provide: getModelToken('Product'),
          useValue: productModel,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
