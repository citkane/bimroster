"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar_1 = __importDefault(require("chokidar"));
class HotDev {
    timeOut;
    webSocket;
    constructor(webRoot, webSocket) {
        this.webSocket = webSocket;
        chokidar_1.default
            .watch(webRoot, { ignoreInitial: true })
            .on('all', (event, path) => {
            //console.log(path);
            this.debounceUpdate();
        });
    }
    async debounceUpdate() {
        if (this.timeOut)
            clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
            this.webSocket.refreshAllClients();
        }, 100);
    }
}
exports.default = HotDev;
