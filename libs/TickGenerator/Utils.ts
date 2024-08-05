import {Status} from "./Types";
import {ERROR, EState} from "./Env";

export const getPositiveStatus = (state: EState): Status => {
    return {isApplied: true, state};
};

export const getNegativeStatus = (state: EState | ERROR): Status => {
    return {isApplied: false, state};
};

export const getMaxNum = (a: number, b: number): number => {
    return (a > b) ? a : b;
};

export const getMinNum = (a: number, b: number): number => {
    return (a > b) ? b : a;
};

export const getMinNumNotZero = (a: number, b: number): number => {
    if (a === 0) {
        return b;
    } else if (b === 0) {
        return a;
    } else {
        return (a > b) ? b : a;
    }
};

export const getAvgNum = (a: number, b: number): number => {
    return Math.round((a + b) / 2);
};
