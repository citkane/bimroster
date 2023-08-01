export default class BrHTMLElement extends HTMLElement {
    get api() {
        return document.api;
    }
    enableEventListeners(events) {
        events.forEach((event) => {
            this.api.on(...event);
        });
    }
    disableEventListeners(events) {
        events.forEach((event) => {
            this.api.off(...event);
        });
    }
    appendChildren(children) {
        children.forEach((child) => this.appendChild(child));
    }
    getHTMLTemplate(id) {
        const template = document.getElementById(id);
        return template
            ? template.content
            : this.makeHTMLElement(`${id}-not-found`);
    }
    makeHTMLElement(tag, classNames, attributes) {
        const template = document.createElement('template');
        let HTML = `<${tag}`;
        if (typeof classNames !== 'string') {
            attributes = classNames;
        }
        else {
            HTML = `${HTML} class="${classNames.trim()}"`;
        }
        if (attributes) {
            Object.keys(attributes).forEach((key) => {
                HTML = `${HTML} ${key}="${attributes[key]}"`;
            });
        }
        HTML = `${HTML}></${tag}>`;
        template.innerHTML = HTML;
        return template.content.firstChild;
    }
}
