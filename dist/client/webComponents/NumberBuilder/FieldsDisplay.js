import BrHTMLElement from '../BrHTMLElement.js';
export class FieldsDisplay extends BrHTMLElement {
    connectedCallback() {
        const fieldsHTML = this.getHTMLTemplate('NumberFieldDisplays');
        this.appendChild(fieldsHTML);
    }
}
customElements.define('fields-display', FieldsDisplay);
customElements.define('field-display', class extends BrHTMLElement {
    constructor() {
        super();
        this.refresh = ({ detail: data }) => {
            this.innerHTML = data || this.default;
            data ? this.enable() : this.disable();
        };
        const { update } = this.api.events.numberBuilder;
        const type = this.getAttribute('type');
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
    enable() {
        this.classList.remove('disabled');
    }
    disable() {
        this.classList.add('disabled');
    }
});
