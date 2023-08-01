import ReadApi from './ReadApi.js';
export default class Api {
    constructor(ws, events) {
        this.on = (command, callBack) => {
            this.BUS.addEventListener(command, callBack);
        };
        this.off = (command, callBack) => {
            this.BUS.removeEventListener(command, callBack);
        };
        this.emit = (subject, data) => this.BUS.dispatchEvent(data
            ? new CustomEvent(subject, { detail: data })
            : new Event(subject));
        this.create = {};
        this.update = {};
        this.destroy = {};
        this.ws = ws;
        this.BUS = new Comment('event-bus');
        this.events = events;
        this.readApi = new ReadApi(this.ws, this.events.read);
        this.on(this.events.system.browser.refresh, () => {
            window.location.reload();
        });
    }
    get read() {
        return this.readApi;
    }
    static decode(string) {
        const parts = string.split('.');
        const id = parts.shift();
        const data = Api.parse(parts);
        return { id, data };
    }
    static parse(parts) {
        return toJson(parts.join('.'));
        function toJson(dataString) {
            try {
                return JSON.parse(dataString);
            }
            catch (err) {
                return toNumber(dataString);
            }
        }
        function toNumber(dataString) {
            const dataNumber = Number(dataString);
            return Number.isNaN(dataNumber) ? dataString : dataNumber;
        }
    }
}
