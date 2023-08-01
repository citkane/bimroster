import BrHTMLElement from '../BrHTMLElement.js';
import FieldSelector from './FieldSelector.js';

customElements.define(
	'number-field-selector',
	class extends BrHTMLElement {
		selectorHTML: FieldSelector;
		displayHTML: HTMLElement;
		constructor() {
			super();
			this.selectorHTML = this.makeHTMLElement<FieldSelector>(
				'field-selector',
				{ type: 'number' },
			);
			this.displayHTML = this.makeHTMLElement('div', 'display');
		}
		connectedCallback() {
			this.appendChildren([this.selectorHTML, this.displayHTML]);
		}
	},
);
