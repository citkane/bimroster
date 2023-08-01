var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BrHTMLElement from '../BrHTMLElement.js';
customElements.define('fields-selection', class extends BrHTMLElement {
    constructor() {
        super();
        this.makeProject = (originatorShortcode) => __awaiter(this, void 0, void 0, function* () {
            if (!originatorShortcode) {
                this.makeLevel();
                this.makeVolume();
                this.makeType();
                this.makeRole();
                return this.api.emit(this.enable.project, []);
            }
            this.fieldOptions.project =
                yield this.api.read.project.allByOriginator(originatorShortcode);
            const projectOptions = this.fieldOptions.project.map((project) => ({
                value: project.jobCode,
                text: `${project.jobCode} - ${project.jobName}`,
                id: project.id.toString(),
            }));
            this.api.emit(this.enable.project, projectOptions);
        });
        this.makeOriginator = () => __awaiter(this, void 0, void 0, function* () {
            this.fieldOptions.originator =
                yield this.api.read.originator.allOriginators();
            const originatorOptions = this.fieldOptions.originator.map((company) => ({
                value: company.shortCode,
                text: `${company.shortCode} - ${company.name}`,
                id: company.id.toString(),
            }));
            this.api.emit(this.enable.originator, originatorOptions);
        });
        this.makeVolume = (volumeSchemaId) => __awaiter(this, void 0, void 0, function* () {
            if (!volumeSchemaId)
                return this.api.emit(this.enable.volume, []);
            this.fieldOptions.volume = yield this.api.read.volume.allBySchema(volumeSchemaId);
            const volumeOptions = this.fieldOptions.volume.map((volume) => ({
                value: volume.shortCode,
                text: `${volume.shortCode} - ${volume.description}`,
            }));
            this.api.emit(this.enable.volume, volumeOptions);
        });
        this.makeLevel = (projectId) => __awaiter(this, void 0, void 0, function* () {
            if (!projectId)
                return this.api.emit(this.enable.level, []);
            this.fieldOptions.level = yield this.api.read.level.allByProject(projectId);
            const levelOptions = this.fieldOptions.level.map((level) => ({
                value: level.shortCode,
                text: `${level.shortCode} - ${level.description}`,
            }));
            this.api.emit(this.enable.level, levelOptions);
        });
        this.makeType = (projectId) => __awaiter(this, void 0, void 0, function* () {
            if (!projectId) {
                this.api.emit(this.enable.number, []);
                return this.api.emit(this.enable.type, []);
            }
            this.fieldOptions.type = yield this.api.read.type.allByProject(projectId);
            const typeOptions = this.fieldOptions.type.map((type) => ({
                value: type.shortCode,
                text: `${type.shortCode} - ${type.description}`,
            }));
            this.api.emit(this.enable.type, typeOptions);
        });
        this.makeRole = (projectId) => __awaiter(this, void 0, void 0, function* () {
            if (!projectId)
                return this.api.emit(this.enable.role, []);
            this.fieldOptions.role = yield this.api.read.role.allByProject(projectId);
            const roleOptions = this.fieldOptions.role.map((role) => ({
                value: role.shortCode,
                text: `${role.shortCode} - ${role.description}`,
            }));
            this.api.emit(this.enable.role, roleOptions);
        });
        this.originatorChanged = ({ detail: originatorShortcode, }) => {
            this.makeProject(originatorShortcode);
        };
        this.projectChanged = ({ detail: projectJobCode, }) => {
            var _a;
            const project = (_a = this.fieldOptions.project) === null || _a === void 0 ? void 0 : _a.find((project) => project.jobCode === projectJobCode);
            this.makeVolume(project === null || project === void 0 ? void 0 : project.volumeSchemaId);
            this.makeLevel(project === null || project === void 0 ? void 0 : project.id);
            this.makeType(project === null || project === void 0 ? void 0 : project.id);
            this.makeRole(project === null || project === void 0 ? void 0 : project.id);
        };
        this.typeChanged = ({ detail: typeShortcode, }) => {
            var _a;
            const type = (_a = this.fieldOptions.type) === null || _a === void 0 ? void 0 : _a.find((type) => type.shortCode === typeShortcode);
            if (type === null || type === void 0 ? void 0 : type.typeSchema) {
                const numberOptions = type === null || type === void 0 ? void 0 : type.typeSchema.SubTypes.map((subType) => ({
                    value: subType.shortCode,
                    text: `${subType.shortCode} - ${subType.description}`,
                }));
                this.api.emit(this.enable.number, numberOptions);
            }
            else {
                this.api.emit(this.enable.number, []);
            }
        };
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
        const selectorsHTML = this.getHTMLTemplate('NumberBuilderFieldSelectors');
        this.appendChild(selectorsHTML);
        this.makeOriginator();
    }
    disconnectedCallback() {
        this.disableEventListeners(this.updateEventListeners);
    }
});
