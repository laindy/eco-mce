import {  ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

export class UpdateProductTypeDto {
  
  @ApiPropertyOptional({
    description: 'New code of the product type',
    example: 'NEWCODE',
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    description: 'New label of the product type',
    example: 'New Label',
  })
  @IsOptional()
  @IsString()
  label?: string;
}
