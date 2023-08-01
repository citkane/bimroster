import Socket from './Socket';
export default class HotDev {
    timeOut?: ReturnType<typeof setTimeout>;
    webSocket: Socket;
    constructor(webRoot: string, webSocket: Socket);
    debounceUpdate(): Promise<void>;
}
