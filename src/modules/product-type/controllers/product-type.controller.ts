import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ErrorMessage } from '@/types/errors/errorHttp';

import {
  CreateProductTypeDto,
  FetchProductTypesByDto,
  TProductType,
  TProductTypeSwaggerSchema,
  UpdateProductTypeDto,
} from '../models';
import { ProductTypeService } from '../services/product-type.service';

@ApiTags('product-types')
@Controller('product-types')
export class ProductTypeController {
  constructor(private readonly service: ProductTypeService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch product types by code,label,pagination' })
  @ApiResponse({
    status: 200,
    description: 'Product types fetched succesfully',
    type: [TProductTypeSwaggerSchema],
  })
  @ApiResponse({
    status: 500,
    description: 'Error while fetching product types',
  })
  async fetchProductTypesBy(
    @Query() query: FetchProductTypesByDto
  ): Promise<TProductType[]> {
    return this.service.fetchProductTypesBy(query);
  }

  @Get('/:productTypeId')
  @ApiOperation({ summary: 'Get product type by id' })
  @ApiResponse({
    status: 200,
    description: 'Product type fetched succesfully',
    type: TProductTypeSwaggerSchema,
  })
  @ApiResponse({
    status: 404,
    description: 'Product type not found',
    type: null,
  })
  @ApiResponse({
    status: 500,
    description: 'Error while fetching product type',
  })
  async getProductTypeById(
    @Param('productTypeId') productTypeId: string
  ): Promise<TProductType> {
    return this.service.getProductTypeById(productTypeId);
  }

  @Post()
  @ApiOperation({ summary: 'Create product type' })
  @ApiResponse({
    status: 200,
    description: 'Product type created succesfully',
    type: TProductTypeSwaggerSchema,
  })
  @ApiResponse({
    status: 500,
    description: `Error while creating product type:${ErrorMessage.UNKNOW_ERROR}`,
  })
  @ApiResponse({
    status: 400,
    description: `Error while creating product type:${ErrorMessage.NOT_UNIQ}`,
  })
  async createProductType(
    @Body(new ValidationPipe()) body: CreateProductTypeDto
  ): Promise<TProductType> {
    return this.service.createProductType(body);
  }

  @Put('/:productTypeId')
  @ApiOperation({ summary: 'Update product type' })
  @ApiResponse({
    status: 200,
    description: 'Product type updated succesfully',
    type: TProductTypeSwaggerSchema,
  })
  @ApiResponse({
    status: 500,
    description: `Error while updating product type:${ErrorMessage.UNKNOW_ERROR}`,
  })
  @ApiResponse({
    status: 400,
    description: `Error while updating product type:${ErrorMessage.NOT_UNIQ}`,
  })
  async updateProductType(
    @Param('productTypeId') productTypeId: string,
    @Body(new ValidationPipe()) body: UpdateProductTypeDto
  ): Promise<TProductType> {
    return this.service.updateProductType(productTypeId, body);
  }

  @Delete('/:productTypeId')
  @ApiOperation({ summary: 'Soft delete product type by id' })
  @ApiResponse({
    status: 200,
    description: 'Product type deleted succesfully',
    type: TProductTypeSwaggerSchema,
  })
  @ApiResponse({
    status: 500,
    description: 'Error while deleting product type',
  })
  async deleteProductType(
    @Param('productTypeId') productTypeId: string
  ): Promise<TProductType> {
    return this.service.deleteProductType(productTypeId);
  }
}
