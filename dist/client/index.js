var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AppWebSocket from './api/AppWebSocket.js';
import Api from './api/Api.js';
import './webComponents/index.js';
import AppBody from './webComponents/AppBody.js';
const url = 'ws://localhost';
const port = 8080;
class BimRosterApp {
    constructor(url, port) {
        this.ws = new AppWebSocket(url, port);
        this.init().then(() => {
            document.api = this.api;
            const appHTML = new AppBody();
            document.body.appendChild(appHTML);
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promises = [this.fetchEventStrings(), this.ws.connect()];
                const [events] = yield Promise.all(promises);
                this.api = new Api(this.ws, events);
                this.ws.listen(this.api);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    fetchEventStrings() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch('/api/events.json').then((response) => response.json());
        });
    }
}
new BimRosterApp(url, port);
