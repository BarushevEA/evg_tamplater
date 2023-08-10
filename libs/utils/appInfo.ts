import {log, utilsInfoInit} from "./utils";

let _name: string;
let _major: number;
let _minor: number;
let _patch: number;

export class AppInfo {
    constructor(name: string, major: number, minor: number, patch: number) {
        _name = name;
        _major = major;
        _minor = minor;
        _patch = patch;

        utilsInfoInit(this);
    }

    set major(value: number) {
        _major = value;
    }

    set minor(value: number) {
        _minor = value;
    }

    set patch(value: number) {
        _patch = value;
    }

    set name(value: string) {
        _name = value;
    }

    get version(): string {
        return `${_major}.${_minor}.${_patch}`;
    }

    get name(): string {
        return _name;
    }

    get description(): string {
        return `[${_name} version: ${this.version}]`.toUpperCase();
    }

    init(isInfoHidden?: boolean) {
        if (!isInfoHidden) {
            log("STARTED");
        }
    }
}
