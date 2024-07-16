import { Test, TestingModule } from '@nestjs/testing';

import {
  CreateProductTypeDto,
  UpdateProductTypeDto,
  FetchProductTypesByDto,
  TProductType,
} from '../models';
import { ProductTypeService } from '../services/product-type.service';

import { ProductTypeController } from './product-type.controller';

describe('ProductTypeController', () => {
  let controller: ProductTypeController;
  let service: ProductTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductTypeController],
      providers: [
        {
          provide: ProductTypeService,
          useValue: {
            createProductType: jest.fn(),
            fetchProductTypesBy: jest.fn(),
            getProductTypeById: jest.fn(),
            updateProductType: jest.fn(),
            deleteProductType: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductTypeController>(ProductTypeController);
    service = module.get<ProductTypeService>(ProductTypeService);
  });

  describe('createProductType', () => {
    it('should create a product type', async () => {
      const dto: CreateProductTypeDto = { label: 'Electronics', code: 'ELEC' };
      const result: TProductType = {
        id: 'dada',
        label: 'Electronics',
        code: 'ELEC',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };

      jest.spyOn(service, 'createProductType').mockResolvedValue(result);

      expect(await controller.createProductType(dto)).toBe(result);
    });
  });

  describe('fetchProductTypesBy', () => {
    it('should fetch product types', async () => {
      const query: FetchProductTypesByDto = { label: 'Electronics' };
      const result: TProductType[] = [
        {
          id: 'dada',
          label: 'Electronics',
          code: 'ELEC',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date(),
        },
      ];

      jest.spyOn(service, 'fetchProductTypesBy').mockResolvedValue(result);

      expect(await controller.fetchProductTypesBy(query)).toBe(result);
    });
  });

  describe('getProductTypeById', () => {
    it('should get a product type by ID', async () => {
      const id = 'adad';
      const result: TProductType = {
        id,
        label: 'Electronics',
        code: 'ELEC',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };

      jest.spyOn(service, 'getProductTypeById').mockResolvedValue(result);

      expect(await controller.getProductTypeById('adad')).toBe(result);
    });
  });

  describe('updateProductType', () => {
    it('should update a product type', async () => {
      const dto: UpdateProductTypeDto = {
        label: 'Updated Electronics',
        code: 'ELEC',
      };
      const result: TProductType = {
        id: 'dada',
        label: 'Updated Electronics',
        code: 'ELEC',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };

      jest.spyOn(service, 'updateProductType').mockResolvedValue(result);

      expect(await controller.updateProductType('dada', dto)).toBe(result);
    });
  });

  describe('deleteProductType', () => {
    it('should delete a product type', async () => {
      const result: TProductType = {
        id: 'dada',
        label: 'Deleted Electronics',
        code: 'ELEC',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };

      jest.spyOn(service, 'deleteProductType').mockResolvedValue(result);

      expect(await controller.deleteProductType('dada')).toBe(result);
    });
  });
});
