import {ID, IMsg} from "../env/types";
import {handlerTest1} from "./handlerTest1";
import {handlerTest2} from "./handlerTest2";
import {handlerTest3} from "./handlerTest3";
import {Observable} from "../../../../../libs/Observables";

export const chanelInput$ = new Observable<IMsg>(undefined);
export const chanelOutput$ = new Observable<IMsg>(undefined);

export class ServiceController {
    public start(): void {
        chanelInput$.subscribe(msg => {
            if (!msg) return;
            if (msg.id === ID.TEST1) handlerTest1(msg);
            if (msg.id === ID.TEST2) handlerTest2(msg);
            if (msg.id === ID.TEST3) handlerTest3(msg);
        });
    }
}
