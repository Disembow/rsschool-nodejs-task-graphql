import { PrismaClient } from '@prisma/client';

export interface IParent {
  id: string;
  authorId?: string;
  userId?: string;
  memberTypeId?: string;
}

export interface IContext {
  prisma: PrismaClient;
}
