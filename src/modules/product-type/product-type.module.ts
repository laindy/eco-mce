import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ProductTypeController } from './controllers/product-type.controller';
import { ProductTypeService } from './services/product-type.service';
import { PrismaService } from '@/database/prisma.service';
import { ManageErrorService } from '@/utils/manage-error/manage-error.service';

@Module({
  imports: [HttpModule],
  providers: [ProductTypeService, ManageErrorService, PrismaService],
  controllers: [ProductTypeController],
})
export class ProductTypeModule {}
