import AppWebSocket from './api/AppWebSocket.js';
import Api from './api/Api.js';
import './webComponents/index.js';
import AppBody from './webComponents/AppBody.js';

declare global {
	interface Document {
		api: Api;
	}
}
const url = 'ws://localhost';
const port = 8080;

class BimRosterApp {
	api!: Api;
	ws: AppWebSocket;
	constructor(url: string, port: number) {
		this.ws = new AppWebSocket(url, port);
		this.init().then(() => {
			document.api = this.api;
			const appHTML = new AppBody();
			document.body.appendChild(appHTML);
		});
	}
	async init() {
		try {
			const promises = [this.fetchEventStrings(), this.ws.connect()];
			const [events] = await Promise.all(promises);
			this.api = new Api(this.ws, events);
			this.ws.listen(this.api);
		} catch (err) {
			console.error(err);
		}
	}

	async fetchEventStrings() {
		return await fetch('/api/events.json').then((response) =>
			response.json(),
		);
	}
}
new BimRosterApp(url, port);
