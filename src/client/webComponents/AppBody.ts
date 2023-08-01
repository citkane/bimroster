import BrHTMLElement from './BrHTMLElement.js';

export default class AppBody extends BrHTMLElement {
	connectedCallback() {
		const HTML = this.getHTMLTemplate('appChrome');
		this.replaceChildren(HTML);
	}
}

customElements.define('app-body', AppBody);
