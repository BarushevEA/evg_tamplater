import {AppInfo} from "./appInfo";
import {Observable} from "evg_observable/src/outLib/Observable";
import {ICallback} from "evg_observable/src/outLib/Types";
import {HTML_BLOCK} from "../elements/registrator";
import {AppDocument} from "../env/browserVariables";

let appInfo: AppInfo;

export function utilsInfoInit(info: AppInfo): void {
    appInfo = info;
}

export function getAppInfo(): AppInfo {
    return appInfo;
}

export function logError(message: any, err: any): void {
    log(message, err);
}

export function log(...args: any): void {
    appInfo ?
        console.log(appInfo.description, ...args) :
        console.log(`APP`, ...args);
}

export function b64DecodeUnicode(str: string): string {
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

export function setInnerHtml(element: HTMLElement, HTMLText: string): void {
    if (element && element.innerHTML) element.innerHTML = HTMLText;
}

export function createElement(tagName: string): HTMLElement {
    return AppDocument.createElement(tagName);
}

export function getDiv(): HTMLElement {
    return createElement("div");
}

export function getStyle(style: string): HTMLElement {
    const element = createElement("style")
    element.innerHTML = style;
    return element;
}

export function getWrapper(): HTMLElement {
    return createElement(HTML_BLOCK);
}

export function getMain(): HTMLElement {
    return createElement("main");
}

export function getSection(): HTMLElement {
    return createElement("section");
}

export function getHeader(): HTMLElement {
    return createElement("header");
}

export function getFooter(): HTMLElement {
    return createElement("footer");
}

export function removeClasses(element: HTMLElement, classes: string[]): void {
    if (!element) return;

    for (let i = 0; i < classes.length; i++) element.classList.remove(classes[i]);
}

export function addClasses(element: HTMLElement, classes: string[]): void {
    if (!element) return;

    for (let i = 0; i < classes.length; i++) element.classList.add(classes[i]);
}

export function toggleClasses(element: HTMLElement, classes: string[]): void {
    if (!element) return;

    for (let i = 0; i < classes.length; i++) element.classList.toggle(classes[i]);
}

export function isClassPresent(element: HTMLElement, token: string): boolean {
    if (!element) return false;

    return element.classList.contains(token);
}

export function appendChild(parent: HTMLElement | ShadowRoot, child: HTMLElement): void {
    if (parent && child) parent.appendChild(child);
}

export function removeChild(parent: HTMLElement, child: HTMLElement | Element): void {
    if (parent && child) parent.removeChild(child);
}

export function getElementsByClass(parent: HTMLElement, token: string): Element[] {
    if (!parent) return [];

    return Array.from(parent.getElementsByClassName(token));
}

export function getValue<T>(element: HTMLElement | Element): T {
    if (!element) return undefined;
    if (!(<any>element).value) return undefined;
    return (<any>element).value
}

export function setValue<T>(element: HTMLElement | Element, value: T): void {
    if (!element) return;
    (<any>element).value = value;
}

export const documentReady$ = new Observable(false);
let isDOMContentLoadedListen = false;

function checkDocumentReady(): void {
    if (AppDocument.body) {
        documentReady$.next(true);
        return;
    }

    if (isDOMContentLoadedListen) return;
    isDOMContentLoadedListen = true;

    const listener = () => {
        documentReady$.next(true);
        AppDocument.removeEventListener("DOMContentLoaded", listener);
        isDOMContentLoadedListen = false;
    };

    AppDocument.addEventListener("DOMContentLoaded", listener);
}

export function runWhenDocumentReady(callback: ICallback<any>): void {
    documentReady$
        .pipe()
        .setOnce()
        .subscribe(isReady => isReady && callback())

    checkDocumentReady();
}
