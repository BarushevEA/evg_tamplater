export type ELEMENT_OPTIONS<T> = {
    htmlTemplate: string;
    startEvent: T;
    className: any;
};

export enum E_DATA_MARKER {
    ROLE = "0",
    ON_CLICK = "click",
    ON_CHANGE = "change",
    ON_KEY_DOWN = "keydown",
    ON_KEY_UP = "keyup",
    ON_KEY_DBL_CLICK = "dblclick",
    ON_SCROLL = "scroll",
    ON_WHEEL = "wheel",
    ON_MOUSE_LEAVE = "mouseleave",
    ON_MOUSE_ENTER = "mouseenter",
    ON_MOUSE_UP = "mouseup",
    ON_MOUSE_DOWN = "mousedown",
    ON_MOUSE_MOVE = "mousemove",
    ON_HANDLE = "handle",
    ON_IF = "if",
}

export enum E_ROOT_TAG {
    TEXT_VALUE = "text-value",
    SHADOW_ROOT = "shadow-root",
}

export function getAttrName(marker: E_DATA_MARKER): string {
    return `data-${marker}`;
}

export function getAttr(element: HTMLElement | Element, marker: E_DATA_MARKER): string {
    if (!element) return "";
    return element.getAttribute(getAttrName(marker))
}

export function setAttr(element: HTMLElement | Element, marker: E_DATA_MARKER, value: string) {
    if (!element) return;
    element.setAttribute(getAttrName(marker), value);
}

export function removeAttr(element: HTMLElement | Element, marker: E_DATA_MARKER): void {
    if (!element) return;
    element.removeAttribute(getAttrName(marker))
}

export type AttributeChanged = {
    name: string,
    oldValue: any,
    newValue: any
};

export type NestedValue = {
    textElement: HTMLElement;
    valueName: string;
};

export type OnIf = {
    ifElement: HTMLElement;
    valueName: string;
    ifParent: HTMLElement;
    oldCondition: boolean;
};
