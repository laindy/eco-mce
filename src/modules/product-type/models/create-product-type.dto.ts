import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class CreateProductTypeDto {
  @IsString()
  @ApiProperty({
    example: 'food',
    description: 'code name for type',
    required: true,
  })
  code: string;

  @IsString()
  @ApiProperty({
    example: 'food',
    description: 'label',
    required: true,
  })
  label: string;
}
