import { Express } from 'express';
export default class Server {
    app: Express;
    port: number;
    webRoot: string;
    constructor(port: number, webRoot: string);
    listen(): Promise<unknown>;
}
