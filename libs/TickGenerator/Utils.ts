import {Status} from "./Types";
import {ERROR, EState} from "./Env";

export function getPositive(state: EState): Status {
    return {isApplied: true, state};
}

export function getNegative(state: EState | ERROR): Status {
    return {isApplied: false, state};
}

export function getMax(a: number, b: number): number {
    return (a > b) ? a : b;
}

export function getMin(a: number, b: number): number {
    return (a > b) ? b : a;
}

export function getMinNumNotZero(a: number, b: number): number {
    if (a === 0) {
        return b;
    } else if (b === 0) {
        return a;
    } else {
        return (a > b) ? b : a;
    }
}

export function getAvg(a: number, b: number): number {
    return Math.round((a + b) / 2);
}
