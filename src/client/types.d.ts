type CustomEventListener<T> = (event: CustomEvent<T>) => void;
type eventList = [string, CustomEventListener<any>][];
