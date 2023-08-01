import { WebSocketServer, WebSocket } from 'ws';
import { uid } from 'uid';
import Api from './Api';
import * as messageStrings from '../api/events.json';
const { system } = messageStrings;

export default class Socket {
	private port: number;
	private api: Api;
	private wss!: WebSocketServer;
	private clientRegister: Record<string, WebSocket>;
	constructor(port: number) {
		this.clientRegister = {};
		this.port = port;
		this.api = new Api();
	}
	private emit(message: string | number) {
		Object.keys(this.clientRegister).forEach((id) => {
			this.clientRegister[id].send(message);
		});
	}
	listen() {
		this.wss = new WebSocketServer({ port: this.port });
		this.wss.on('connection', (ws) => {
			const id = uid();
			this.clientRegister[id] = ws;
			ws.on('error', console.error);

			ws.on('message', async (request) => {
				const message = Api.decode(request.toString());
				console.log(message);
				const { id, action, table, command, parameter } = message;
				const response = await this.api[action][table][command](
					parameter,
				);
				const responseString = JSON.stringify(response);
				ws.send(`${id}.${responseString}`);
			});

			ws.on('close', () => {
				delete this.clientRegister[id];
			});
		});
	}
	refreshAllClients() {
		this.emit(system.browser.refresh);
	}
}
