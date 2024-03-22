import {ISubscribeObject} from "./Types";

export function deleteFromArray<T>(arr: T[], component: T): boolean {
    const index = arr.indexOf(component);
    if (index === -1) return false;
    arr.splice(index, 1);
    return true;
}

export function quickDeleteFromArray<T>(arr: T[], component: T): boolean {
    const index = arr.indexOf(component);
    if (index === -1) return false;
    arr[index] = arr[arr.length - 1];
    arr.length = arr.length - 1;
    return true;
}

export const negativeCallback = () => false;
export const positiveCallback = () => true;
export const randomCallback = () => "772716b8-e6e2-47ac-95e9-e8d99ce35124";
export const sortAscending = (a: ISubscribeObject<any>, b: ISubscribeObject<any>) => {
    if (a.order > b.order) return 1;
    if (a.order < b.order) return -1;
    return 0;
};
export const sortDescending = (a: ISubscribeObject<any>, b: ISubscribeObject<any>) => {
    if (a.order > b.order) return -1;
    if (a.order < b.order) return 1;
    return 0;
};
