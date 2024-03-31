import {Observable} from "evg_observable/src/outLib/Observable";
import {COMMAND_TEST1, COMMAND_TEST2, COMMAND_TEST3, ID, IMsg} from "../env/types";

export const chanelInput$ = new Observable<IMsg>(undefined);
export const chanelOutput$ = new Observable<IMsg>(undefined);

export class ServiceController {
    public start(): void {
        chanelInput$.subscribe(msg => {
            if (!msg) return;
            if (msg.id === ID.TEST1) this.handlerTest1(msg);
            if (msg.id === ID.TEST2) this.handlerTest2(msg);
            if (msg.id === ID.TEST3) this.handlerTest3(msg);
        });
    }

    private handlerTest1(msg: IMsg) {
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

    private handlerTest2(msg: IMsg) {
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

    private handlerTest3(msg: IMsg) {
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
}
