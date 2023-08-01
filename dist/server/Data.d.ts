import { PrismaClient } from '@prisma/client';
export default class Data {
    client: PrismaClient;
    constructor();
    findMany(table: string, command?: {}): any;
}
