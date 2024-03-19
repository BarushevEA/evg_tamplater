import {Status} from "./Types";
import {ERROR, EState} from "./Env";

export function getPositiveStatus(state: EState): Status {
    return {isApplied: true, state};
}

export function getNegativeStatus(state: EState | ERROR): Status {
    return {isApplied: false, state};
}
