import {Collector} from "evg_observable/src/outLib/Collector";
import {ISubscriptionLike} from "evg_observable/src/outLib/Types";
import {IChanelListener} from "../env/types";
import {CONDITION} from "../enums/CONDITION";

export type OnCreate = { onCreate: () => void };
export type OnInit = { onInit: () => void };
export type OnDestroy = { onDestroy: () => void };
export type OnMessage = { onMessage: (message: any) => void };
export type ELEMENT_OPTIONS = {
    template: string;
    element: any;
};

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
    init$(): IChanelListener<boolean>;
    destroy$(): IChanelListener<boolean>;
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
    ahe_number: number;
    ahe_nValues: NestedValue[];
    ahe_bindValues: NestedValue[];
    ahe_nFunctions: NestedValue[];
    ahe_sourceComponents: NestedValue[];
    ahe_sourceComponentsFunctions: NestedValue[];
    ahe_bindFunctions: NestedValue[];
    ahe_IfList: OnIf[];
    ahe_ClsIfList: ClassIf[];
    ahe_ForOfList: ForOf[];
    ahe_component: any;
    ahe_clr: Collector;
    ahe_parent_chanel: IChannel;
} & RootBehavior;
export type ValDetails = {
    isInversion: boolean;
    valueName: string;
    isFunction: boolean;
}
