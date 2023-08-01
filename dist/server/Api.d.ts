export default class Api {
    read: {
        originator: {
            allOriginators: () => any;
        };
        project: {
            allByOriginator: (companyShortcode: string) => any;
        };
        volume: {
            allBySchema: (volumeSchemaId: string) => any;
        };
        level: {
            allByProject: (projectId: string) => any;
        };
        role: {
            allByProject: (projectId: string) => any;
        };
        type: {
            allByProject: (projectId: string) => any;
        };
    };
    static decode(string: string): {
        id: string;
        action: string;
        table: string;
        command: string;
        parameter: string;
    };
}
