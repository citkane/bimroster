import BrHTMLElement from '../BrHTMLElement.js';

customElements.define(
	'fields-selection',
	class extends BrHTMLElement {
		updateEventListeners: eventList;
		enable: typeof this.api.events.numberBuilder.enable;
		fieldOptions: Partial<optionRegister>;

		constructor() {
			super();
			const { update } = this.api.events.numberBuilder;
			this.fieldOptions = {};
			this.enable = this.api.events.numberBuilder.enable;
			this.updateEventListeners = [
				[update.originator, this.originatorChanged],
				[update.project, this.projectChanged],
				[update.type, this.typeChanged],
			];
		}
		connectedCallback() {
			this.enableEventListeners(this.updateEventListeners);
			const selectorsHTML = this.getHTMLTemplate(
				'NumberBuilderFieldSelectors',
			);
			this.appendChild(selectorsHTML);
			this.makeOriginator();
		}
		disconnectedCallback() {
			this.disableEventListeners(this.updateEventListeners);
		}

		private makeProject = async (originatorShortcode: string) => {
			if (!originatorShortcode) {
				this.makeLevel();
				this.makeVolume();
				this.makeType();
				this.makeRole();
				return this.api.emit(this.enable.project, []);
			}

			this.fieldOptions.project =
				await this.api.read.project.allByOriginator(
					originatorShortcode,
				);
			const projectOptions = this.fieldOptions.project.map((project) => ({
				value: project.jobCode,
				text: `${project.jobCode} - ${project.jobName}`,
				id: project.id.toString(),
			}));

			this.api.emit(this.enable.project, projectOptions);
		};
		private makeOriginator = async () => {
			this.fieldOptions.originator =
				await this.api.read.originator.allOriginators();
			const originatorOptions = this.fieldOptions.originator.map(
				(company) => ({
					value: company.shortCode,
					text: `${company.shortCode} - ${company.name}`,
					id: company.id.toString(),
				}),
			);
			this.api.emit(this.enable.originator, originatorOptions);
		};
		private makeVolume = async (volumeSchemaId?: number) => {
			if (!volumeSchemaId) return this.api.emit(this.enable.volume, []);

			this.fieldOptions.volume = await this.api.read.volume.allBySchema(
				volumeSchemaId,
			);
			const volumeOptions = this.fieldOptions.volume.map((volume) => ({
				value: volume.shortCode,
				text: `${volume.shortCode} - ${volume.description}`,
			}));
			this.api.emit(this.enable.volume, volumeOptions);
		};

		private makeLevel = async (projectId?: number) => {
			if (!projectId) return this.api.emit(this.enable.level, []);
			this.fieldOptions.level = await this.api.read.level.allByProject(
				projectId,
			);

			const levelOptions = this.fieldOptions.level.map((level) => ({
				value: level.shortCode,
				text: `${level.shortCode} - ${level.description}`,
			}));
			this.api.emit(this.enable.level, levelOptions);
		};
		private makeType = async (projectId?: number) => {
			if (!projectId) {
				this.api.emit(this.enable.number, []);
				return this.api.emit(this.enable.type, []);
			}
			this.fieldOptions.type = await this.api.read.type.allByProject(
				projectId,
			);
			const typeOptions = this.fieldOptions.type.map((type) => ({
				value: type.shortCode,
				text: `${type.shortCode} - ${type.description}`,
			}));
			this.api.emit(this.enable.type, typeOptions);
		};
		private makeRole = async (projectId?: number) => {
			if (!projectId) return this.api.emit(this.enable.role, []);
			this.fieldOptions.role = await this.api.read.role.allByProject(
				projectId,
			);

			const roleOptions = this.fieldOptions.role.map((role) => ({
				value: role.shortCode,
				text: `${role.shortCode} - ${role.description}`,
			}));
			this.api.emit(this.enable.role, roleOptions);
		};

		private originatorChanged: CustomEventListener<string> = ({
			detail: originatorShortcode,
		}) => {
			this.makeProject(originatorShortcode);
		};
		private projectChanged: CustomEventListener<string> = ({
			detail: projectJobCode,
		}) => {
			const project = this.fieldOptions.project?.find(
				(project) => project.jobCode === projectJobCode,
			);
			this.makeVolume(project?.volumeSchemaId);
			this.makeLevel(project?.id);
			this.makeType(project?.id);
			this.makeRole(project?.id);
		};
		private typeChanged: CustomEventListener<string> = ({
			detail: typeShortcode,
		}) => {
			const type = this.fieldOptions.type?.find(
				(type) => type.shortCode === typeShortcode,
			);
			if (type?.typeSchema) {
				const numberOptions = type?.typeSchema.SubTypes.map(
					(subType: SubType) => ({
						value: subType.shortCode,
						text: `${subType.shortCode} - ${subType.description}`,
					}),
				);
				this.api.emit(this.enable.number, numberOptions);
			} else {
				this.api.emit(this.enable.number, []);
			}
		};
	},
);
