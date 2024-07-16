import { ProductType } from '@prisma/client';

export const productTypeMock: ProductType = {
  id: 'xadad',
  code: 'food',
  label: 'food',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};
