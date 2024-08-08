import {AppInfo} from "./appInfo";

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

export function log(...args: any[]): void {
    appInfo ?
        console.log(appInfo.description, ...args) :
        console.log(`APP`, ...args);
}

export function b64DecodeUnicode(str: string): string {
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

