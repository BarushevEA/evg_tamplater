import {COMMAND_TEST2, IMsg} from "../env/types";
import {chanelOutput$} from "./service";

export function handlerTest2(msg: IMsg) {
    if (msg.command === COMMAND_TEST2.GET_CAR) {
        chanelOutput$.next({
            id: msg.id,
            payload: "cool car",
        });
        return;
    }
    if (msg.command === COMMAND_TEST2.GET_BIKE) {
        chanelOutput$.next({
            id: msg.id,
            payload: "cool bike",
        });
        return;
    }
    chanelOutput$.next({
        id: msg.id,
        payload: "empty",
    });
    return;
}
