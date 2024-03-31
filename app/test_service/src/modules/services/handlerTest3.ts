import {COMMAND_TEST3, IMsg} from "../env/types";
import {chanelOutput$} from "./service";

export function handlerTest3(msg: IMsg) {
    if (msg.command === COMMAND_TEST3.GET_COOKIE) {
        chanelOutput$.next({
            id: msg.id,
            payload: "cool cookie",
        });
        return;
    }
    if (msg.command === COMMAND_TEST3.GET_CAKE) {
        chanelOutput$.next({
            id: msg.id,
            payload: "cool cake",
        });
        return;
    }
    chanelOutput$.next({
        id: msg.id,
        payload: "empty",
    });
    return;
}
