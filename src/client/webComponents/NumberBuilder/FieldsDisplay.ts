import BrHTMLElement from '../BrHTMLElement.js';

export class FieldsDisplay extends BrHTMLElement {
	connectedCallback() {
		const fieldsHTML = this.getHTMLTemplate('NumberFieldDisplays');
		this.appendChild(fieldsHTML);
	}
}
customElements.define('fields-display', FieldsDisplay);

customElements.define(
	'field-display',
	class extends BrHTMLElement {
		default: string;
		eventListeners: eventList;
		constructor() {
			super();
			const { update } = this.api.events.numberBuilder;
			const type = this.getAttribute('type') as codeField;
			this.default = '??';
			this.innerHTML = this.default;
			this.classList.add('disabled');
			this.eventListeners = [[update[type], this.refresh]];
		}
		connectedCallback() {
			this.enableEventListeners(this.eventListeners);
		}
		disconnectedCallback() {
			this.disableEventListeners(this.eventListeners);
		}
		refresh: CustomEventListener<string> = ({ detail: data }) => {
			this.innerHTML = data || this.default;
			data ? this.enable() : this.disable();
		};
		enable() {
			this.classList.remove('disabled');
		}
		disable() {
			this.classList.add('disabled');
		}
	},
);
