let read;
export default class ReadApi {
    constructor(ws, readStrings) {
        this.originator = {
            allOriginators: () => {
                return this.ws.fetch(read.originator.allOriginators);
            },
        };
        this.project = {
            allByOriginator: (originatorId) => {
                return this.ws.fetch(read.project.allByOriginator, originatorId);
            },
        };
        this.volume = {
            allBySchema: (volumeSchemaId) => {
                return this.ws.fetch(read.volume.allBySchema, volumeSchemaId);
            },
        };
        this.level = {
            allByProject: (projectId) => {
                return this.ws.fetch(read.level.allByProject, projectId);
            },
        };
        this.type = {
            allByProject: (projectId) => {
                return this.ws.fetch(read.type.allByProject, projectId);
            },
        };
        this.role = {
            allByProject: (projectId) => {
                return this.ws.fetch(read.role.allByProject, projectId);
            },
        };
        read = readStrings;
        this.ws = ws;
    }
}
