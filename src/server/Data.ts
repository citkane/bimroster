import { PrismaClient } from '@prisma/client';

export default class Data {
	client: PrismaClient;
	constructor() {
		this.client = new PrismaClient();
	}
	findMany(table: string, command = {}) {
		try {
			//console.log(JSON.stringify(command, null, 4));
			return this.client[table].findMany(command);
		} catch (err) {
			console.error(err);
			return err;
		}
	}
}
