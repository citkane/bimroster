import BrHTMLElement from '../BrHTMLElement.js';
export default class NumberBuilder extends BrHTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const selectorHTML = this.makeHTMLElement('fields-selection');
        const displayHTML = this.makeHTMLElement('fields-display');
        this.appendChildren([selectorHTML, displayHTML]);
    }
}
customElements.define('number-builder', NumberBuilder);
