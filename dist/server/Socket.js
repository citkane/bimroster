"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const uid_1 = require("uid");
const Api_1 = __importDefault(require("./Api"));
const messageStrings = __importStar(require("../api/events.json"));
const { system } = messageStrings;
class Socket {
    port;
    api;
    wss;
    clientRegister;
    constructor(port) {
        this.clientRegister = {};
        this.port = port;
        this.api = new Api_1.default();
    }
    emit(message) {
        Object.keys(this.clientRegister).forEach((id) => {
            this.clientRegister[id].send(message);
        });
    }
    listen() {
        this.wss = new ws_1.WebSocketServer({ port: this.port });
        this.wss.on('connection', (ws) => {
            const id = (0, uid_1.uid)();
            this.clientRegister[id] = ws;
            ws.on('error', console.error);
            ws.on('message', async (request) => {
                const message = Api_1.default.decode(request.toString());
                console.log(message);
                const { id, action, table, command, parameter } = message;
                const response = await this.api[action][table][command](parameter);
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
exports.default = Socket;
