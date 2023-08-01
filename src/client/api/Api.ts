import AppWebSocket from './AppWebSocket.js';
import ReadApi from './ReadApi.js';

export default class Api {
	ws: AppWebSocket;
	BUS: Comment;
	events: eventStrings;
	readApi: ReadApi;

	constructor(ws: AppWebSocket, events: eventStrings) {
		this.ws = ws;
		this.BUS = new Comment('event-bus');
		this.events = events;
		this.readApi = new ReadApi(this.ws, this.events.read);

		this.on(this.events.system.browser.refresh, () => {
			window.location.reload();
		});
	}
	on = (command: string, callBack: (event: CustomEvent<any>) => void) => {
		this.BUS.addEventListener(command, callBack as EventListener);
	};
	off = (command: string, callBack: (event: CustomEvent<any>) => void) => {
		this.BUS.removeEventListener(command, callBack as EventListener);
	};
	emit = (subject: string, data?: any) =>
		this.BUS.dispatchEvent(
			data
				? new CustomEvent(subject, { detail: data })
				: new Event(subject),
		);
	create = {};
	get read() {
		return this.readApi;
	}
	update = {};
	destroy = {};
	static decode(string: string) {
		const parts = string.split('.');
		const id = parts.shift()!;
		const data = Api.parse(parts);
		return { id, data };
	}
	static parse(parts: string[]) {
		return toJson(parts.join('.'));

		function toJson(dataString: string) {
			try {
				return JSON.parse(dataString);
			} catch (err) {
				return toNumber(dataString);
			}
		}
		function toNumber(dataString: string) {
			const dataNumber = Number(dataString);
			return Number.isNaN(dataNumber) ? dataString : dataNumber;
		}
	}
}
