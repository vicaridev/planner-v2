import { PrismaClient as DefaultPrismaClient } from '@prisma/client';

export class PrismaClient extends DefaultPrismaClient {
  constructor() {
    super({
      log: ['query'],
      errorFormat: 'pretty',
    });
  }
}
