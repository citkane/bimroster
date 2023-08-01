import BrHTMLElement from '../BrHTMLElement.js';
export default class FieldSelector extends BrHTMLElement {
    selectHTML: HTMLSelectElement;
    selectValue: string;
    enableEventsList: eventList;
    updateEvents: typeof this.api.events.numberBuilder.update;
    enableEvents: typeof this.api.events.numberBuilder.enable;
    defaultOptionInfo: optionInfo;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    get type(): codeField;
    private onChange;
    private set disabled(value);
    private setOptions;
    private makeOption;
    static optionHasValue(value: string, selectHTMLElement: HTMLSelectElement): boolean;
}
