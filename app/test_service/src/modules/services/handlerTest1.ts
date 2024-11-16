import {COMMAND_TEST1, IMsg} from "../env/types";
import {chanelOutput$} from "./service";

export function handlerTest1(msg: IMsg) {
    if (msg.command === COMMAND_TEST1.GET_APPLES) {
        chanelOutput$.next({
            id: msg.id,
            payload: "sweet apples",
        });
        return;
    }
    if (msg.command === COMMAND_TEST1.GET_MEET) {
        chanelOutput$.next({
            id: msg.id,
            payload: "delicious meet",
        });
        return;
    }
    chanelOutput$.next({
        id: msg.id,
        payload: "empty",
    });
    return;
}

// test
