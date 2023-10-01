import {AppChanelName} from "./env";
import {IObservablePipe, ISubscriber} from "evg_observable/src/outLib/Types";
import {Observable} from "evg_observable/src/outLib/Observable";

export type Base64 = string;
export type JsonStr = string;
export type IChanelListener<T> = ISubscriber<T> & IObservablePipe<T>
export type IAppChanelMap = {
    [channelName: string]:  Observable<any>;
};
export type GlobalWindow = Window & {
    [AppChanelName]: IAppChanelMap;
};
export type GlobalDocument = Document & {};
