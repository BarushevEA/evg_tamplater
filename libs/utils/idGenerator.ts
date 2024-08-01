import {AppWindow} from "../env/browserVariables";

let length = 32;
let arr = new Uint8Array((length || 40) / 2);

export function setIdLength(newLength: number) {
    if (!newLength) return;
    if (newLength % 2 === 0) length = newLength;
    if (newLength % 2 === 1) length = newLength + 1;
    arr = new Uint8Array(length / 2);
}

function byteToHex(byte: number): string {
    return (`0${byte.toString(16)}`).slice(-2);
}

export function generateId(): string {
    AppWindow.crypto.getRandomValues(arr);
    return Array.from(arr, byteToHex).join('');
}

export function getStrongCrypto(): string {
    return `${generateId()}${Date.now()}`
}
