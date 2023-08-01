import express, { Express, Request, Response } from 'express';
import * as path from 'path';

export default class Server {
	app: Express;
	port: number;
	webRoot: string;
	constructor(port: number, webRoot: string) {
		this.port = port;
		this.app = express();
		this.app.use(express.json());
		this.webRoot = webRoot;
		const apiRoot = path.join(webRoot, '../', 'api');

		this.app.use(
			'/api',
			express.static(apiRoot, {
				setHeaders: (res) =>
					res.setHeader('Content-Type', 'application/json'),
			}),
		);
		this.app.use(express.static(this.webRoot));
	}
	listen() {
		return new Promise((resolve, reject) => {
			this.app.listen(this.port, () => {
				console.info(
					`Server is listening on port: ${this.port} serving from ${this.webRoot}\nhttp://localhost:${this.port}`,
				);
				resolve(true);
			});
		});
	}
}
