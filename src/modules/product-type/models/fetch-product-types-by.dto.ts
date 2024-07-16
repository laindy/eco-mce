import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class FetchProductTypesByDto {
  @ApiPropertyOptional({
    description: 'Code of the product type to filter by',
    example: 'ABC123',
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    description: 'Label of the product type to filter by',
    example: 'Electronics',
  })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiPropertyOptional({ description: 'Number of items per page', example: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  itemsPerPage?: number;

  @ApiPropertyOptional({ description: 'Page number', example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;
}
