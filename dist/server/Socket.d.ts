export default class Socket {
    private port;
    private api;
    private wss;
    private clientRegister;
    constructor(port: number);
    private emit;
    listen(): void;
    refreshAllClients(): void;
}
