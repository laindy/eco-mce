import { Module } from '@nestjs/common';
import { ManageErrorService } from './manage-error/manage-error.service';

const services = [ManageErrorService];

@Module({
  providers: services,
  exports: services,
})
export class UtilsModule {}
