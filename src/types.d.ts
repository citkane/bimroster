/**
 * Corresponds to the type of each field that makes up the composite number
 */
type codeField =
	| 'project'
	| 'originator'
	| 'volume'
	| 'level'
	| 'type'
	| 'role'
	| 'number'
	| 'status'
	| 'revision';

interface optionRegister {
	project: Project[];
	originator: Originator[];
	volume: Volume[];
	level: Level[];
	type: Type[];
	role: Role[];
	number: Number[];
}

interface optionInfo {
	value: string;
	text: string;
	id?: string;
}
interface Originator {
	shortCode: string;
	name: string;
	id: number;
}
interface Project {
	NumberSchemaId: number;
	id: number;
	jobCode: string;
	jobName: string;
	jobNo: number;
	volumeSchemaId: number;
}
interface Volume {
	companyId: number;
	description: string;
	shortCode: string;
}
interface Level {
	shortCode: string;
	description: string;
}
interface Type {
	shortCode: string;
	description: string;
	tracked: boolean;
	typeSchema?: TypeSchema;
}
interface SubType {
	shortCode: string;
	description: string;
	typeSchemaId: number;
}
interface TypeSchema {
	id: number;
	SubTypes: SubType[];
}
interface Role {
	shortCode: string;
	description: string;
}
