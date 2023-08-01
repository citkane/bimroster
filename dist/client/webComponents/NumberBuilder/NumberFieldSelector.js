import BrHTMLElement from '../BrHTMLElement.js';
customElements.define('number-field-selector', class extends BrHTMLElement {
    constructor() {
        super();
        this.selectorHTML = this.makeHTMLElement('field-selector', { type: 'number' });
        this.displayHTML = this.makeHTMLElement('div', 'display');
    }
    connectedCallback() {
        this.appendChildren([this.selectorHTML, this.displayHTML]);
    }
});
