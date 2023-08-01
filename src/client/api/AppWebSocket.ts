import Api from './Api.js';

type Registry = Record<string, Resolver>;
type Resolve = (value: unknown) => void;

export default class AppWebSocket {
	socket!: WebSocket;
	registry: Registry;
	private url: String;
	private port: Number;
	constructor(url: String, port: number) {
		this.url = url;
		this.port = port;
		this.registry = {};
	}
	connect() {
		this.socket = new WebSocket(`${this.url}:${this.port}`);

		return new Promise((resolve, reject) => {
			// Connection opened
			this.socket.addEventListener('open', (event) => {
				resolve(null);
			});
			// Connection error
			this.socket.addEventListener('error', (err) => {
				reject(err);
			});
		});
	}
	listen(api: Api) {
		// Listen for messages
		this.socket.addEventListener('message', (event) => {
			const { id, data } = Api.decode(event.data);
			console.log(`${id}.${data}`);
			if (this.registry[id] === undefined)
				return api.emit(`${id}.${data}`);
			this.registry[id].resolve(data);
			delete this.registry[id];
		});
	}
	fetch<T>(command: string, identifier?: string | number) {
		const id = uid();
		command = identifier ? `${command}.${identifier}` : command;
		this.socket.send(`${id}.${command}`);
		return new Promise((resolve, reject) => {
			this.registry[id] = new Resolver(resolve);
		}) as unknown as Promise<T>;
	}
}
class Resolver {
	private resolveFromPromise: Resolve;
	constructor(resolveFromPromise: Resolve) {
		this.resolveFromPromise = resolveFromPromise;
	}
	resolve(data: any) {
		this.resolveFromPromise(data);
	}
}

// Create a uid
let IDX = 36,
	HEX = '';
while (IDX--) HEX += IDX.toString(36);

function uid(len = 11) {
	let str = '',
		num = len;
	while (num--) str += HEX[(Math.random() * 36) | 0];
	return str;
}
