"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = __importDefault(require("./Data"));
const data = new Data_1.default();
class Api {
    read = {
        originator: {
            allOriginators: () => {
                return data.findMany('company');
            },
        },
        project: {
            allByOriginator: (companyShortcode) => {
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
            allBySchema: (volumeSchemaId) => {
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
            allByProject: (projectId) => {
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
            allByProject: (projectId) => {
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
            allByProject: (projectId) => {
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
    static decode(string) {
        const parts = string.split('.');
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
exports.default = Api;
