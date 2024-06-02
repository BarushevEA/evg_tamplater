import {IListener, ISetObservableValue, ISubscribeGroup, ISubscribeObject} from "./Types";

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

export function getListener<T>(listener: ISubscribeGroup<T>): IListener<T> {
    if (Array.isArray(listener)) {
        const group: IListener<T>[] = [];

        for (let i = 0; i < listener.length; i++) {
            group.push(wrapListener(<any>listener[i]));
        }

        return (data?: T) => {
            for (let i = 0; i < group.length; i++) group[i](data);
        };
    }

    return wrapListener(<any>listener);
}

function wrapListener<T>(listener: IListener<T> | ISetObservableValue) {
    if ("next" in listener) return (value?: T): any => listener.next(value);
    return <any>listener;
}
