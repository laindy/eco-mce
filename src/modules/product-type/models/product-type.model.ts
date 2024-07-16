import { ApiProperty } from '@nestjs/swagger';

export type TProductType = {
  id: string;
  code: string;
  label: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export class TProductTypeSwaggerSchema {
  @ApiProperty({
    example: 'dadada',
    description: 'Id of product types',
  })
  id: string;

  @ApiProperty({
    example: 'food',
    description: 'Code of product type',
  })
  code: string;

  @ApiProperty({
    example: 'food',
    description: 'Label of product type',
  })
  label: string;

  @ApiProperty({
    example: '19/01/01',
    description: 'creation date of product type',
  })
  createdAt: Date;
  @ApiProperty({
    example: '19/01/01',
    description: 'creation date of product type',
  })
  updatedAt: Date;
  @ApiProperty({
    example: '19/01/01',
    description: 'creation date of product type',
  })
  deletedAt: Date;
}
