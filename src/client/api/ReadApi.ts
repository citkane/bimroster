import Api from './Api';
import AppWebSocket from './AppWebSocket';
let read: eventStrings['read'];

export default class ReadApi {
	ws: AppWebSocket;
	constructor(ws: AppWebSocket, readStrings: eventStrings['read']) {
		read = readStrings;
		this.ws = ws;
	}

	originator = {
		allOriginators: () => {
			return this.ws.fetch<Originator[]>(read.originator.allOriginators);
		},
	};
	project = {
		allByOriginator: (originatorId: string) => {
			return this.ws.fetch<Project[]>(
				read.project.allByOriginator,
				originatorId,
			);
		},
	};
	volume = {
		allBySchema: (volumeSchemaId: number) => {
			return this.ws.fetch(
				read.volume.allBySchema,
				volumeSchemaId,
			) as Promise<Volume[]>;
		},
	};
	level = {
		allByProject: (projectId: number) => {
			return this.ws.fetch<Level[]>(read.level.allByProject, projectId);
		},
	};
	type = {
		allByProject: (projectId: number) => {
			return this.ws.fetch<Type[]>(read.type.allByProject, projectId);
		},
	};
	role = {
		allByProject: (projectId: number) => {
			return this.ws.fetch<Role[]>(read.role.allByProject, projectId);
		},
	};
}
