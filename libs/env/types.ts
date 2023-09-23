import {IObservablePipe, ISubscriber, ISubscriptionLike} from "evg_observable/src/outLib/Types";
import {Collector} from "evg_observable/src/outLib/Collector";
import {CONDITION} from "../elements/utils";

export type Base64 = string;
export type JsonStr = string;
export type GlobalWindow = Window & {};
export type GlobalDocument = Document & {};
export type OnCreate = { onCreate: () => void };
export type OnInit = { onInit: () => void };
export type OnDestroy = { onDestroy: () => void };
export type ELEMENT_OPTIONS = {
    template: string;
    element: any;
};
export type AttributeChanged = {
    name: string,
    oldValue: any,
    newValue: any
};
export type NestedValue = {
    textElement: HTMLElement;
    valueName: string;
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
export type IChanel = {
    sendData<T>(data: T): void;
};
export type RootBehavior = {
    adopted$(): ISubscriber<boolean> & IObservablePipe<boolean>;
    init$(): ISubscriber<boolean> & IObservablePipe<boolean>;
    destroy$(): ISubscriber<boolean> & IObservablePipe<boolean>;
    attributeChange$(): ISubscriber<AttributeChanged | undefined> & IObservablePipe<AttributeChanged | undefined>;
    beforeChanges$(): ISubscriber<boolean> & IObservablePipe<boolean>;
    changesDetected$(): ISubscriber<boolean> & IObservablePipe<boolean>;
    parentChanelReady$(): ISubscriber<IChanel> & IObservablePipe<IChanel>;
    dataCatch$<T>(): ISubscriber<T> & IObservablePipe<T>;
    detectChanges(): void;
    collect(...subscriptionLikeList: ISubscriptionLike<any>[]): void;
    getElementsBoundToMethod(method: any): HTMLElement[];
    destroy(): void;
    getChanel(element: any): IChanel | undefined;
    isAppElement(element: any): boolean;
} & HTMLElement;
export type RootElement = {
    ahe_number: number;
    ahe_nValues: NestedValue[];
    ahe_nFunctions: NestedValue[];
    ahe_IfList: OnIf[];
    ahe_ClsIfList: ClassIf[];
    ahe_ForOfList: ForOf[];
    ahe_component: any;
    ahe_clr: Collector;
    ahe_parent_chanel: IChanel;
} & RootBehavior;
export type ValDetails = {
    isInversion: boolean;
    valueName: string;
    isFunction: boolean;
}
