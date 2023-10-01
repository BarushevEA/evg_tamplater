import {CONDITION} from "./utils";
import {Collector} from "evg_observable/src/outLib/Collector";
import {ISubscriptionLike} from "evg_observable/src/outLib/Types";
import {IChanelListener} from "../env/types";

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
    adopted$(): IChanelListener<boolean>;
    init$(): IChanelListener<boolean>;
    destroy$(): IChanelListener<boolean>;
    attributeChange$(): IChanelListener<AttributeChanged>;
    beforeChanges$(): IChanelListener<boolean>;
    changesDetected$(): IChanelListener<boolean>;
    parentChanelReady$(): IChanelListener<IChanel>;
    dataCatch$<T>(): IChanelListener<T>;
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
