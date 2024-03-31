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
                id: ID.TEST1,
                payload: "sweet apples",
            });
            return;
        }
        if (msg.command === COMMAND_TEST1.GET_MEET) {
            chanelOutput$.next({
                id: ID.TEST1,
                payload: "delicious meet",
            });
            return;
        }
        chanelOutput$.next({
            id: ID.TEST1,
            payload: "empty",
        });
        return;
    }

    private handlerTest2(msg: IMsg) {
        if (msg.command === COMMAND_TEST2.GET_CAR) {
            chanelOutput$.next({
                id: ID.TEST2,
                payload: "cool car",
            });
            return;
        }
        if (msg.command === COMMAND_TEST2.GET_BIKE) {
            chanelOutput$.next({
                id: ID.TEST2,
                payload: "cool bike",
            });
            return;
        }
        chanelOutput$.next({
            id: ID.TEST2,
            payload: "empty",
        });
        return;
    }

    private handlerTest3(msg: IMsg) {
        if (msg.command === COMMAND_TEST3.GET_COOKIE) {
            chanelOutput$.next({
                id: ID.TEST3,
                payload: "cool cookie",
            });
            return;
        }
        if (msg.command === COMMAND_TEST3.GET_CAKE) {
            chanelOutput$.next({
                id: ID.TEST3,
                payload: "cool cake",
            });
            return;
        }
        chanelOutput$.next({
            id: ID.TEST3,
            payload: "empty",
        });
        return;
    }
}
