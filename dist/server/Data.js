"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class Data {
    client;
    constructor() {
        this.client = new client_1.PrismaClient();
    }
    findMany(table, command = {}) {
        try {
            //console.log(JSON.stringify(command, null, 4));
            return this.client[table].findMany(command);
        }
        catch (err) {
            console.error(err);
            return err;
        }
    }
}
exports.default = Data;
