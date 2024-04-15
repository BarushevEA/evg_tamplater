import {IObservablePipe, ISubscriber, ISubscriptionLike} from "evg_observable/src/outLib/Types";
import {CONDITION} from "../enums/CONDITION";
import {Collector} from "evg_observable/src/outLib/Collector";

export type Base64 = string;
export type JsonStr = string;
export type IChanelListener<T> = ISubscriber<T> & IObservablePipe<T>

export type GlobalWindow = Window & {};
export type GlobalDocument = Document & {};


export type IAppElement = Element & HTMLElement & {
    isCustomAppElement: boolean;
};
export type AttributeChanged = {
    name: string,
    oldValue: any,
    newValue: any
};
export type NestedValue = {
    textElement: HTMLElement;
    valueName: string;
    lastData: string;
};
export type OnIf = {
    ifElement: HTMLElement;
    valueName: string;
    ifParent: HTMLElement;
    oldCondition: boolean;
    isInversion: boolean;
    isFunction: boolean;
};
export type ClassCondition = {
    firstClassName: string;
    secondClassName: string;
    conditionName: string;
    oldCondition: CONDITION;
    isInversion: boolean;
    isFunction: boolean;
    isConditionDisabled: boolean;
};
export type ClassIf = {
    element: HTMLElement;
    classConditions: ClassCondition[];
};
export type ForOf = {
    parent: HTMLElement;
    template: HTMLElement;
    children: HTMLElement[];
    valueName: string;
};
export type IChannel = {
    sendMessage<T>(data: T): void;
};
export type IChildChannel = IChannel | undefined;
export type RootBehavior = {
    adopted$(): IChanelListener<boolean>;
    beforeInit$(): IChanelListener<boolean>;
    beforeDestroy$(): IChanelListener<boolean>;
    attributeChange$(): IChanelListener<AttributeChanged>;
    beforeChanges$(): IChanelListener<boolean>;
    changesDetected$(): IChanelListener<boolean>;
    parentChanelReady$(): IChanelListener<IChannel>;
    onMessage$<T>(): IChanelListener<T>;
    detectChanges(): void;
    collect(...subscriptionLikeList: ISubscriptionLike[]): void;
    getElementsBoundToMethod(method: any): HTMLElement[];
    destroy(): void;
    getChannel(element: any): IChannel | undefined;
    transferToChannel<T, V>(chanelCb: () => IChannel, dataCb: (data: T) => V): void;
    sendToChannel<T>(chanel: IChannel, data: T): void;
    sendMessageToParent<T>(data: T): boolean;
    isAppElement(element: any): boolean;
} & HTMLElement;
export type RootElement = {
    ahe_nmr: number;
    ahe_nVls: NestedValue[];
    ahe_bndVls: NestedValue[];
    ahe_nFns: NestedValue[];
    ahe_srcCms: NestedValue[];
    ahe_srcCmsFns: NestedValue[];
    ahe_bndFns: NestedValue[];
    ahe_IfLst: OnIf[];
    ahe_ClsIfLst: ClassIf[];
    ahe_ForOfLst: ForOf[];
    ahe_cmt: any;
    ahe_clr: Collector;
    ahe_pnt_chl: IChannel;
} & RootBehavior;
export type ValDetails = {
    isInversion: boolean;
    valueName: string;
    isFunction: boolean;
}
export type OnCreate = { onCreate: () => void };
export type OnInit = { onInit: () => void };
export type OnDestroy = { onDestroy: () => void };
export type OnMessage = { onMessage: (message: any) => void };
export type ELEMENT_OPTIONS = {
    template: string;
    element: any;
};
