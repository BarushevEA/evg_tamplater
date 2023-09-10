import {AttributeChanged, NestedValue, OnIf} from "../elements/utils";
import {ISubscriptionLike} from "evg_observable/src/outLib/Types";
import {Observable} from "evg_observable/src/outLib/Observable";
import {Collector} from "evg_observable/src/outLib/Collector";

export type Base64 = string;
export type JsonStr = string;
export type GlobalWindow = Window & {};
export type GlobalDocument = Document & {};
export type OnCreate = { onCreate: () => void };
export type OnInit = { onInit: () => void };
export type OnDestroy = { onDestroy: () => void };
export type RootBehavior = {
    onAdopted$: Observable<boolean>;
    onInit$: Observable<boolean>;
    onDestroy$: Observable<boolean>;
    attributeChanged$: Observable<AttributeChanged | undefined>;
    beforeDetectChanges$: Observable<boolean>;
    onChangesDetected$: Observable<boolean>;
    detectChanges(): void;
    collect(...subscriptionLikeList: ISubscriptionLike<any>[]): void;
    getElementsBoundToMethod(method: any): HTMLElement[];
    destroy(): void;
} & HTMLElement;
export type RootElement = {
    ahe_number: number;
    ahe_nValues: NestedValue[];
    ahe_nFunctions: NestedValue[];
    ahe_IfList: OnIf[];
    ahe_component: any;
    ahe_clr: Collector;
} & RootBehavior;
