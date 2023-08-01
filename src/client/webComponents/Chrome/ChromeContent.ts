import BrHTMLElement from '../BrHTMLElement.js';

customElements.define(
	'chrome-content',
	class extends BrHTMLElement {
		connectedCallback() {
			const numberBuilderHTML = this.makeHTMLElement('number-builder');
			this.appendChild(numberBuilderHTML);
		}
	},
);
