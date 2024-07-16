import { Injectable, Logger } from '@nestjs/common';

import { ErrorDb, ErrorMessage } from '@/types/errors/errorHttp';
import { HttpStatusCode } from '@/types/global/http/code';

import {
  CreateProductTypeDto,
  FetchProductTypesByDto,
  TProductType,
  UpdateProductTypeDto,
} from '../models';

import { PrismaService } from '@/database/prisma.service';
import { ManageErrorService } from '@/utils/manage-error/manage-error.service';

@Injectable()
export class ProductTypeService {
  private readonly ownLogger = new Logger(ProductTypeService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly managerError: ManageErrorService
  ) {}

  async createProductType({
    label,
    code,
  }: CreateProductTypeDto): Promise<TProductType> {
    try {
      const productType = await this.prisma.productType.create({
        data: {
          label,
          code,
        },
      });
      this.ownLogger.log('Product Type created successfully');
      return productType;
    } catch (e) {
      this.ownLogger.error('Failed to create Product type');
      if (e.code === ErrorDb.NOT_UNIQ) {
        this.managerError.ServerError(
          ErrorMessage.NOT_UNIQ,
          HttpStatusCode.BAD_REQUEST
        );
      } else {
        this.managerError.ServerError(
          ErrorMessage.UNKNOW_ERROR,
          HttpStatusCode.BAD_REQUEST
        );
      }
    }
  }

  async fetchProductTypesBy({
    code,
    label,
    itemsPerPage,
    page,
  }: FetchProductTypesByDto): Promise<TProductType[]> {
    const skip = page && itemsPerPage ? (page - 1) * itemsPerPage : undefined;
    const take = itemsPerPage;

    try {
      return await this.prisma.productType.findMany({
        where: {
          ...(code && {
            code: {
              contains: code,
            },
          }),
          ...(label && {
            label: {
              contains: label,
            },
          }),
        },
        skip,
        take,
      });
    } catch (e) {
      this.ownLogger.error('Failed to fetch Product Types', e);
      this.managerError.ServerError(
        ErrorMessage.UNKNOW_ERROR,
        HttpStatusCode.BAD_REQUEST
      );
    }
  }

  async updateProductType(
    id: string,
    updateProductTypeDto: UpdateProductTypeDto
  ): Promise<TProductType> {
    try {
      const productType = await this.prisma.productType.update({
        where: { id },
        data: updateProductTypeDto,
      });
      this.ownLogger.log('Product Type updated successfully');
      return productType;
    } catch (e) {
      this.ownLogger.error('Failed to update Product Type', e);
      if (e.code === ErrorDb.NOT_UNIQ) {
        this.managerError.ServerError(
          ErrorMessage.NOT_UNIQ,
          HttpStatusCode.BAD_REQUEST
        );
      } else {
        this.managerError.ServerError(
          ErrorMessage.UNKNOW_ERROR,
          HttpStatusCode.BAD_REQUEST
        );
      }
    }
  }

  async deleteProductType(productTypeId: string): Promise<TProductType> {
    try {
      const productType = await this.prisma.productType.update({
        where: { id: productTypeId },
        data: {
          deletedAt: new Date(),
        },
      });
      this.ownLogger.log('Product Type soft deleted successfully');
      return productType;
    } catch (e) {
      this.ownLogger.error('Failed to soft delete Product Type', e);
      this.managerError.ServerError(
        ErrorMessage.UNKNOW_ERROR,
        HttpStatusCode.BAD_REQUEST
      );
    }
  }

  async getProductTypeById(
    productTypeId: string
  ): Promise<TProductType | null> {
    try {
      const productType = await this.prisma.productType.findUnique({
        where: { id: productTypeId },
      });
      if (!productType) {
        this.ownLogger.warn(`Product Type with ID ${productTypeId} not found`);
        return null;
      }
      return productType;
    } catch (e) {
      this.ownLogger.error('Failed to retrieve Product Type', e);
      this.managerError.ServerError(
        ErrorMessage.UNKNOW_ERROR,
        HttpStatusCode.BAD_REQUEST
      );
    }
  }
}
