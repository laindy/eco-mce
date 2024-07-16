import { Test, TestingModule } from '@nestjs/testing';

import { ErrorDb, ErrorMessage } from '@/types/errors/errorHttp';
import { HttpStatusCode } from '@/types/global/http/code';

import { productTypeMock } from '../mock/product-type';
import {
  CreateProductTypeDto,
  FetchProductTypesByDto,
  UpdateProductTypeDto,
} from '../models';

import { ProductTypeService } from './product-type.service';
import { PrismaService } from '@/database/prisma.service';
import { ManageErrorService } from '@/utils/manage-error/manage-error.service';

describe('ProductTypeService', () => {
  let service: ProductTypeService;
  let prisma: PrismaService;
  let manageErrorService: ManageErrorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductTypeService,
        {
          provide: PrismaService,
          useValue: {
            productType: {
              create: jest.fn().mockResolvedValue(productTypeMock),
              update: jest.fn().mockResolvedValue(productTypeMock),
              findMany: jest.fn().mockResolvedValue([productTypeMock]),
              findUnique: jest.fn().mockResolvedValue(productTypeMock),
            },
          },
        },
        {
          provide: ManageErrorService,
          useValue: {
            ServerError: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductTypeService>(ProductTypeService);
    prisma = module.get<PrismaService>(PrismaService);
    manageErrorService = module.get<ManageErrorService>(ManageErrorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProductType', () => {
    it('should create product type', async () => {
      const productType = await service.createProductType({
        label: productTypeMock.label,
        code: productTypeMock.code,
      });
      expect(productType).toStrictEqual(productTypeMock);
    });
    it('should handle NOT_UNIQ error', async () => {
      const dto: CreateProductTypeDto = { label: 'Test', code: 'TEST' };
      jest
        .spyOn(prisma.productType, 'create')
        .mockRejectedValue({ code: ErrorDb.NOT_UNIQ });

      try {
        await service.createProductType(dto);
      } catch (e) {}

      expect(manageErrorService.ServerError).toHaveBeenCalledWith(
        ErrorMessage.NOT_UNIQ,
        HttpStatusCode.BAD_REQUEST
      );
    });

    it('should handle UNKNOW_ERROR error', async () => {
      const dto: CreateProductTypeDto = { label: 'Test', code: 'TEST' };
      jest
        .spyOn(prisma.productType, 'create')
        .mockRejectedValue(new Error('Unknown error'));

      try {
        await service.createProductType(dto);
      } catch (e) {}

      expect(manageErrorService.ServerError).toHaveBeenCalledWith(
        ErrorMessage.UNKNOW_ERROR,
        HttpStatusCode.BAD_REQUEST
      );
    });
  });

  describe('fetchProductTypesBy', () => {
    it('should fetch product types with filters', async () => {
      const dto: FetchProductTypesByDto = {
        code: 'TEST',
        label: 'Test',
        itemsPerPage: 10,
        page: 1,
      };

      const result = await service.fetchProductTypesBy(dto);
      expect(result).toEqual([productTypeMock]);
      expect(prisma.productType.findMany).toHaveBeenCalledWith({
        where: {
          code: { contains: 'TEST' },
          label: { contains: 'Test' },
        },
        skip: 0,
        take: 10,
      });
    });

    it('should handle errors during fetching product types', async () => {
      const dto: FetchProductTypesByDto = { code: 'ERROR' };
      const error = new Error('Database error');

      jest.spyOn(prisma.productType, 'findMany').mockRejectedValue(error);

      try {
        await service.fetchProductTypesBy(dto);
      } catch (e) {}
      expect(manageErrorService.ServerError).toHaveBeenCalledWith(
        ErrorMessage.UNKNOW_ERROR,
        HttpStatusCode.BAD_REQUEST
      );
    });
  });

  describe('updateProductType', () => {
    it('should update a product type successfully', async () => {
      const dto: UpdateProductTypeDto = {
        label: 'Updated Label',
        code: 'Updated Code',
      };

      const result = await service.updateProductType('xdad', dto);
      expect(result).toEqual(productTypeMock);
      expect(prisma.productType.update).toHaveBeenCalledWith({
        where: { id: 'xdad' },
        data: { label: 'Updated Label', code: 'Updated Code' },
      });
    });

    it('should handle NOT_UNIQ error on update', async () => {
      const dto: UpdateProductTypeDto = {
        label: 'Updated Label',
        code: 'Updated Code',
      };
      const error = { code: ErrorDb.NOT_UNIQ };

      jest.spyOn(prisma.productType, 'update').mockRejectedValue(error);

      try {
        await service.updateProductType('idad', dto);
      } catch (e) {}

      expect(manageErrorService.ServerError).toHaveBeenCalledWith(
        ErrorMessage.NOT_UNIQ,
        HttpStatusCode.BAD_REQUEST
      );
    });
    it('should handle unknown errors on update', async () => {
      const dto: UpdateProductTypeDto = {
        label: 'Updated Label',
        code: 'Updated Code',
      };
      const error = new Error('Unknown error');

      jest.spyOn(prisma.productType, 'update').mockRejectedValue(error);

      try {
        await service.updateProductType('dadad', dto);
      } catch (e) {}

      expect(manageErrorService.ServerError).toHaveBeenCalledWith(
        ErrorMessage.UNKNOW_ERROR,
        HttpStatusCode.BAD_REQUEST
      );
    });
  });

  describe('deleteProductType', () => {
    it('should soft delete a product type successfully', async () => {
      const result = await service.deleteProductType('sx');
      expect(result).toEqual(productTypeMock);
      expect(prisma.productType.update).toHaveBeenCalledWith({
        where: { id: 'sx' },
        data: { deletedAt: expect.any(Date) },
      });
    });

    it('should handle errors during soft deletion', async () => {
      const error = new Error('Database error');

      jest.spyOn(prisma.productType, 'update').mockRejectedValue(error);
      try {
        await service.deleteProductType('sx');
      } catch (e) {}
      expect(manageErrorService.ServerError).toHaveBeenCalledWith(
        ErrorMessage.UNKNOW_ERROR,
        HttpStatusCode.BAD_REQUEST
      );
    });
  });

  describe('getProductTypeById', () => {
    it('should retrieve a product type by ID', async () => {
      const result = await service.getProductTypeById('sx');
      expect(result).toEqual(productTypeMock);
      expect(prisma.productType.findUnique).toHaveBeenCalledWith({
        where: { id: 'sx' },
      });
    });
    it('should return null if product type is not found', async () => {
      jest.spyOn(prisma.productType, 'findUnique').mockResolvedValue(null);

      const result = await service.getProductTypeById('sx');
      expect(result).toBeNull();
      expect(prisma.productType.findUnique).toHaveBeenCalledWith({
        where: { id: 'sx' },
      });
    });

    it('should handle errors during retrieval', async () => {
      const error = new Error('Database error');

      jest.spyOn(prisma.productType, 'findUnique').mockRejectedValue(error);

      try {
        await service.getProductTypeById('sx');
      } catch (e) {}
      expect(manageErrorService.ServerError).toHaveBeenCalledWith(
        ErrorMessage.UNKNOW_ERROR,
        HttpStatusCode.BAD_REQUEST
      );
    });
  });
});
