import BrHTMLElement from '../BrHTMLElement.js';

export default class FieldSelector extends BrHTMLElement {
	selectHTML: HTMLSelectElement;
	selectValue: string;
	enableEventsList: eventList;
	updateEvents: typeof this.api.events.numberBuilder.update;
	enableEvents: typeof this.api.events.numberBuilder.enable;
	defaultOptionInfo: optionInfo;

	constructor() {
		super();
		this.updateEvents = this.api.events.numberBuilder.update;
		this.enableEvents = this.api.events.numberBuilder.enable;

		this.selectHTML = this.makeHTMLElement<HTMLSelectElement>('select');
		this.selectHTML.onchange = this.onChange;
		this.selectValue = '';
		this.defaultOptionInfo = {
			value: '',
			text: `select ${this.getAttribute('type')}`,
		};

		this.enableEventsList = [
			[this.enableEvents[this.type], this.setOptions],
		];
		this.disabled = true;
	}
	connectedCallback() {
		this.enableEventListeners(this.enableEventsList);

		this.appendChild(this.selectHTML);
	}
	disconnectedCallback() {
		this.disableEventListeners(this.enableEventsList);
	}

	get type() {
		return this.getAttribute('type') as codeField;
	}

	private onChange = () => {
		this.selectValue = this.selectHTML.value || '';
		this.api.emit(this.updateEvents[this.type], this.selectHTML.value);
	};
	private set disabled(state: boolean) {
		this.selectHTML.disabled = state;
		state
			? this.classList.add('disabled')
			: this.classList.remove('disabled');
	}

	private setOptions: CustomEventListener<optionInfo[]> = ({
		detail: options,
	}) => {
		if (!options.length) {
			this.disabled = true;
			this.selectHTML.replaceChildren();
			this.api.emit(this.updateEvents[this.type]);
			return;
		}

		this.disabled = false;
		const newOptions = [
			this.makeOption(this.defaultOptionInfo),
			...options.map((info) => this.makeOption(info)),
		];
		this.selectHTML.replaceChildren();
		newOptions.forEach((option) => this.selectHTML.appendChild(option));
		if (FieldSelector.optionHasValue(this.selectValue, this.selectHTML)) {
			this.selectHTML.value = this.selectValue;
			this.onChange();
		}
	};
	private makeOption(info: optionInfo) {
		const optionHtml = this.makeHTMLElement<HTMLOptionElement>('option');
		optionHtml.innerText = info.text;
		optionHtml.value = info.value;
		optionHtml.setAttribute('childId', info.id || info.value);
		return optionHtml;
	}
	static optionHasValue(value: string, selectHTMLElement: HTMLSelectElement) {
		return !![...selectHTMLElement.options].find(
			(option) => option.value === value,
		);
	}
}

customElements.define('field-selector', FieldSelector);
