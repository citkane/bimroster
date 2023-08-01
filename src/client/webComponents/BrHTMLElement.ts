export default class BrHTMLElement extends HTMLElement {
	get api() {
		return document.api;
	}
	enableEventListeners(events: eventList) {
		events.forEach((event) => {
			this.api.on(...event);
		});
	}
	disableEventListeners(events: eventList) {
		events.forEach((event) => {
			this.api.off(...event);
		});
	}

	appendChildren(children: (HTMLElement | DocumentFragment)[]) {
		children.forEach((child) => this.appendChild(child));
	}
	getHTMLTemplate(id: string) {
		const template = document.getElementById(id) as HTMLTemplateElement;
		return template
			? template.content
			: this.makeHTMLElement(`${id}-not-found`);
	}
	makeHTMLElement<T = HTMLElement>(tag: string): T;
	makeHTMLElement<T = HTMLElement>(tag: string, classNames: string): T;
	makeHTMLElement<T = HTMLElement>(
		tag: string,
		attributes: Record<string, string>,
	): T;
	makeHTMLElement<T = HTMLElement>(
		tag: string,
		classNames: string,
		attributes: Record<string, string>,
	): T;
	makeHTMLElement<T = HTMLElement>(
		tag: string,
		classNames?: string | Record<string, string>,
		attributes?: Record<string, string>,
	) {
		const template = document.createElement('template');
		let HTML = `<${tag}`;
		if (typeof classNames !== 'string') {
			attributes = classNames;
		} else {
			HTML = `${HTML} class="${classNames.trim()}"`;
		}
		if (attributes) {
			Object.keys(attributes).forEach((key) => {
				HTML = `${HTML} ${key}="${attributes![key]}"`;
			});
		}
		HTML = `${HTML}></${tag}>`;
		template.innerHTML = HTML;
		return template.content.firstChild as T;
	}
}
