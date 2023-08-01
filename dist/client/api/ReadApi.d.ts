import AppWebSocket from './AppWebSocket';
export default class ReadApi {
    ws: AppWebSocket;
    constructor(ws: AppWebSocket, readStrings: eventStrings['read']);
    originator: {
        allOriginators: () => Promise<Originator[]>;
    };
    project: {
        allByOriginator: (originatorId: string) => Promise<Project[]>;
    };
    volume: {
        allBySchema: (volumeSchemaId: number) => Promise<Volume[]>;
    };
    level: {
        allByProject: (projectId: number) => Promise<Level[]>;
    };
    type: {
        allByProject: (projectId: number) => Promise<Type[]>;
    };
    role: {
        allByProject: (projectId: number) => Promise<Role[]>;
    };
}
