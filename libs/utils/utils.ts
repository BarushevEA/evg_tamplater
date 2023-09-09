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

export function getDiv(): HTMLElement {
    return AppDocument.createElement("div");
}

export function getStyle(style: string): HTMLElement {
    const element = AppDocument.createElement("style")
    element.innerHTML = style;
    return element;
}

export function getWrapper(): HTMLElement {
    return AppDocument.createElement(HTML_BLOCK);
}

export function getMain(): HTMLElement {
    return AppDocument.createElement("main");
}

export function getSection(): HTMLElement {
    return AppDocument.createElement("section");
}

export function getHeader(): HTMLElement {
    return AppDocument.createElement("header");
}

export function getFooter(): HTMLElement {
    return AppDocument.createElement("footer");
}

export function removeClasses(element: HTMLElement, classes: string[]): void {
    if (!element) return;

    for (const token of classes) element.classList.remove(token);
}

export function addClasses(element: HTMLElement, classes: string[]): void {
    if (!element) return;

    for (const token of classes) element.classList.add(token);
}

export function toggleClasses(element: HTMLElement, classes: string[]): void {
    if (!element) return;

    for (const token of classes) element.classList.toggle(token);
}

export function isClassPresent(element: HTMLElement, token: string): boolean {
    if (!element) return false;

    return element.classList.contains(token);
}

export function appendChild(parent: HTMLElement | ShadowRoot, child: HTMLElement): void {
    if (parent && child) parent.appendChild(child);
}

export function removeChild(parent: HTMLElement, child: HTMLElement): void {
    if (parent && child) parent.removeChild(child);
}

export function getElementsByClass(parent: HTMLElement, token: string): Element[] {
    if (!parent) return [];

    return Array.from(parent.getElementsByClassName(token));
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

    AppDocument.addEventListener("DOMContentLoaded", () => {
        documentReady$.next(true);
    });
}

export function runWhenDocumentReady(callback: ICallback<any>): void {
    documentReady$
        .pipe()
        .setOnce()
        .subscribe(isReady => isReady && callback())

    checkDocumentReady();
}
