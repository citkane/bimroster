export default class BrHTMLElement extends HTMLElement {
    get api(): import("../api/Api").default;
    enableEventListeners(events: eventList): void;
    disableEventListeners(events: eventList): void;
    appendChildren(children: (HTMLElement | DocumentFragment)[]): void;
    getHTMLTemplate(id: string): HTMLElement | DocumentFragment;
    makeHTMLElement<T = HTMLElement>(tag: string): T;
    makeHTMLElement<T = HTMLElement>(tag: string, classNames: string): T;
    makeHTMLElement<T = HTMLElement>(tag: string, attributes: Record<string, string>): T;
    makeHTMLElement<T = HTMLElement>(tag: string, classNames: string, attributes: Record<string, string>): T;
}
