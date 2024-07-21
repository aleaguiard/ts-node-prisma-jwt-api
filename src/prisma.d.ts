import { PrismaClient } from '@prisma/client';

declare module '@prisma/client' {
	interface PrismaClientOptions {
		adapter?: any;
	}
}
