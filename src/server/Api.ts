import Data from './Data';

const data = new Data();
export default class Api {
	read = {
		originator: {
			allOriginators: () => {
				return data.findMany('company');
			},
		},
		project: {
			allByOriginator: (companyShortcode: string) => {
				return data.findMany('project', {
					where: {
						companies: {
							some: {
								shortCode: companyShortcode,
							},
						},
					},
					include: {
						volumes: true,
						NumberRanges: true,
					},
				});
			},
		},
		volume: {
			allBySchema: (volumeSchemaId: string) => {
				return data.findMany('volume', {
					where: {
						volumes: {
							some: {
								id: Number(volumeSchemaId),
							},
						},
					},
				});
			},
		},
		level: {
			allByProject: (projectId: string) => {
				return data.findMany('level', {
					where: {
						projects: {
							some: {
								id: Number(projectId),
							},
						},
					},
				});
			},
		},
		role: {
			allByProject: (projectId: string) => {
				return data.findMany('role', {
					where: {
						projects: {
							some: {
								id: Number(projectId),
							},
						},
					},
				});
			},
		},
		type: {
			allByProject: (projectId: string) => {
				return data.findMany('type', {
					where: {
						projects: {
							some: {
								id: Number(projectId),
							},
						},
					},
					include: {
						typeSchema: { select: { SubTypes: true, id: true } },
					},
				});
			},
		},
	};
	static decode(string: string) {
		const parts: string[] = string.split('.');
		const id = parts.shift();
		const action = parts.shift();
		const table = parts.shift();
		const command = parts.shift();
		const parameter = parts.shift();
		return {
			id,
			action,
			table,
			command,
			parameter,
		};
	}
}
