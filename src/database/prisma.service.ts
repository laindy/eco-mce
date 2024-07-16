import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

   type ExtendedPrismaClient = PrismaClient & {
     $on: (eventName: string, callback: () => Promise<void>) => void;
   };

   @Injectable()
   export class PrismaService extends PrismaClient implements OnModuleInit {
     prisma: ExtendedPrismaClient;

     constructor() {
       super();
       this.prisma = this as unknown as ExtendedPrismaClient;
     }

     async onModuleInit() {
       await this.$connect();
     }

     async enableShutdownHooks(app: INestApplication) {
       this.prisma.$on('beforeExit', async () => {
         await app.close();
       });
     }
   }