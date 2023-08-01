import Api from './Api.js';
type Registry = Record<string, Resolver>;
type Resolve = (value: unknown) => void;
export default class AppWebSocket {
    socket: WebSocket;
    registry: Registry;
    private url;
    private port;
    constructor(url: String, port: number);
    connect(): Promise<unknown>;
    listen(api: Api): void;
    fetch<T>(command: string, identifier?: string | number): Promise<T>;
}
declare class Resolver {
    private resolveFromPromise;
    constructor(resolveFromPromise: Resolve);
    resolve(data: any): void;
}
export {};
