export enum E_DATA_MARKER {
    INFO = "i",
    INJECT_TO = "inject_to",
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
    CLASS_IF = "cls",
    FOR = "for",
}

export const E_DATA_MARKER_KEYS = Object.keys(E_DATA_MARKER);

export enum E_ROOT_TAG {
    TEXT_VALUE = "txt-val",
}

export function getAttrName(marker: E_DATA_MARKER): string {
    return `data-${marker}`;
}

export function getAttr(element: HTMLElement | Element, marker: E_DATA_MARKER): string {
    if (!element) return "";
    return element.getAttribute(getAttrName(marker))
}

export function getAttrNative(element: HTMLElement | Element, marker: string): string {
    if (!element) return "";
    return element.getAttribute(marker)
}

export function setAttr(element: HTMLElement | Element, marker: E_DATA_MARKER, value: string) {
    if (!element) return;
    element.setAttribute(getAttrName(marker), value);
}

export function removeAttr(element: HTMLElement | Element, marker: E_DATA_MARKER): void {
    if (!element) return;
    element.removeAttribute(getAttrName(marker))
}

