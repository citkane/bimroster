import Socket from './Socket';
import chokidar from 'chokidar';

export default class HotDev {
	timeOut?: ReturnType<typeof setTimeout>;
	webSocket: Socket;
	constructor(webRoot: string, webSocket: Socket) {
		this.webSocket = webSocket;
		chokidar
			.watch(webRoot, { ignoreInitial: true })
			.on('all', (event, path) => {
				//console.log(path);
				this.debounceUpdate();
			});
	}
	async debounceUpdate() {
		if (this.timeOut) clearTimeout(this.timeOut);
		this.timeOut = setTimeout(() => {
			this.webSocket.refreshAllClients();
		}, 100);
	}
}
