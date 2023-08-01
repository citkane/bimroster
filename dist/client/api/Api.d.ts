import AppWebSocket from './AppWebSocket.js';
import ReadApi from './ReadApi.js';
export default class Api {
    ws: AppWebSocket;
    BUS: Comment;
    events: eventStrings;
    readApi: ReadApi;
    constructor(ws: AppWebSocket, events: eventStrings);
    on: (command: string, callBack: (event: CustomEvent<any>) => void) => void;
    off: (command: string, callBack: (event: CustomEvent<any>) => void) => void;
    emit: (subject: string, data?: any) => boolean;
    create: {};
    get read(): ReadApi;
    update: {};
    destroy: {};
    static decode(string: string): {
        id: string;
        data: any;
    };
    static parse(parts: string[]): any;
}
