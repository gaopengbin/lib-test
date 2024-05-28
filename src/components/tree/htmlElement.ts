type HTMLElementEvent<T extends HTMLElement> = Event & {
    target: T;
};

type HTMLElementMouseEvent<T extends HTMLElement> = MouseEvent & {
    target: T;
};

export type {
    HTMLElementEvent,
    HTMLElementMouseEvent
};