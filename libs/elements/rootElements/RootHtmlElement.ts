import {IObservablePipe, ISubscriber, ISubscriptionLike} from "evg_observable/src/outLib/Types";
import {Observable} from "evg_observable/src/outLib/Observable";
import {
    changeBindFunctions,
    changeBindValues,
    changeClsConditions,
    changeForOf,
    changeIfConditions,
    changeNestedFunctions,
    changeNestedValues,
    changeSource,
    changeSourceFunctions,
    detectInjectedData,
    E_DATA_MARKER,
    E_ROOT_TAG,
    getAttr,
    ifDoubleInitVar
} from "../utils";
import {Collector} from "evg_observable/src/outLib/Collector";
import {
    AttributeChanged,
    ClassIf,
    ELEMENT_OPTIONS,
    ForOf,
    IAppElement,
    IChannel,
    NestedValue,
    OnIf,
    RootElement
} from "../types";
import {IChanelListener} from "../../env/types";

export function getCustomElement(options: ELEMENT_OPTIONS): CustomElementConstructor {
    class RootHtmlElement extends HTMLElement implements RootElement {
        static ahe_Counter = 0;
        ahe_number = 0;
        private ahe_opts: ELEMENT_OPTIONS;

        ahe_nValues: NestedValue[];
        ahe_nFunctions: NestedValue[];
        ahe_sourceComponents: NestedValue[];
        ahe_sourceComponentsFunctions: NestedValue[];
        ahe_bindValues: NestedValue[];
        ahe_bindFunctions: NestedValue[];

        ahe_IfList: OnIf[];
        ahe_ClsIfList: ClassIf[];
        ahe_ForOfList: ForOf[];
        ahe_clr: Collector;
        ahe_component: any;
        ahe_parent_chanel: IChannel;

        onAdopted$: Observable<boolean>;
        onDestroy$: Observable<boolean>;
        attributeChanged$: Observable<AttributeChanged | undefined>;
        beforeDetectChanges$: Observable<boolean>;
        onChangesDetected$: Observable<boolean>;
        onMsg$: Observable<any>;
        onParentChanelReady$: Observable<IChannel>;

        constructor() {
            super();

            this.ahe_number = RootHtmlElement.ahe_Counter;
            RootHtmlElement.ahe_Counter++;

            this.onAdopted$ = new Observable(false);
            this.onDestroy$ = new Observable(false);
            this.attributeChanged$ = new Observable(undefined);
            this.beforeDetectChanges$ = new Observable(false);
            this.onChangesDetected$ = new Observable(false);
            this.onMsg$ = new Observable(undefined);
            this.onParentChanelReady$ = new Observable(undefined);
            this.ahe_clr = new Collector();
            this.ahe_nFunctions = [];
            this.ahe_sourceComponentsFunctions = [];
            this.ahe_sourceComponents = [];
            this.ahe_nValues = [];
            this.ahe_bindFunctions = [];
            this.ahe_bindValues = [];
            this.ahe_IfList = [];
            this.ahe_ClsIfList = [];
            this.ahe_ForOfList = [];

            this.ahe_opts = options;
            this.ahe_component = new options.element(this);

            if (this.ahe_component.onCreate) this.ahe_component.onCreate();
        }

        parentChanelReady$(): ISubscriber<IChannel> & IObservablePipe<IChannel> {
            return this.onParentChanelReady$;
        }

        adopted$(): ISubscriber<boolean> & IObservablePipe<boolean> {
            return this.onAdopted$;
        }

        destroy$(): ISubscriber<boolean> & IObservablePipe<boolean> {
            return this.onDestroy$;
        }

        attributeChange$(): ISubscriber<AttributeChanged | undefined> & IObservablePipe<AttributeChanged | undefined> {
            return this.attributeChanged$;
        }

        beforeChanges$(): ISubscriber<boolean> & IObservablePipe<boolean> {
            return this.beforeDetectChanges$;
        }

        changesDetected$(): ISubscriber<boolean> & IObservablePipe<boolean> {
            return this.onChangesDetected$;
        }

        onMessage$<T>(): IChanelListener<T> {
            return <any>this.onMsg$;
        }

        connectedCallback() {
            if (getAttr(this, E_DATA_MARKER.ON_IF)) {
                if (!this.ahe_component[ifDoubleInitVar]) return;
            }

            if (this.ahe_opts.template) this.innerHTML = this.ahe_opts.template;
            if (this.tagName.toLowerCase() === E_ROOT_TAG.TEXT_VALUE) return;
            if (this.tagName.toLowerCase() === E_ROOT_TAG.QSI_BIND) return;

            detectInjectedData(this);

            if (this.ahe_component.onInit) this.ahe_component.onInit();
            if (this.ahe_component.onMessage) {
                this.collect(
                    this.onMsg$.subscribe(message => {
                        this.ahe_component.onMessage(message);
                    })
                );
            }

            this.detectChanges(true);
        }

        disconnectedCallback() {
            if (getAttr(this, E_DATA_MARKER.ON_IF)) {
                if (!this.ahe_component[ifDoubleInitVar]) {
                    this.ahe_component[ifDoubleInitVar] = true;
                    return;
                }
            }

            if (this.tagName.toLowerCase() === E_ROOT_TAG.TEXT_VALUE) return;
            if (this.tagName.toLowerCase() === E_ROOT_TAG.QSI_BIND) return;

            this.onDestroy$.next(true);
            if (this.ahe_component.onDestroy) this.ahe_component.onDestroy();

            this.ahe_clr.unsubscribeAll();
            this.ahe_nFunctions.length = 0;
            this.ahe_sourceComponentsFunctions.length = 0;
            this.ahe_sourceComponents.length = 0;
            this.ahe_nValues.length = 0;
            this.ahe_bindFunctions.length = 0;
            this.ahe_bindValues.length = 0;
            this.ahe_IfList.length = 0;
            this.ahe_ClsIfList.length = 0;
            this.ahe_ForOfList.length = 0;
            this.innerHTML = "";
            this.onAdopted$.unsubscribeAll();
            this.onDestroy$.unsubscribeAll();
            this.attributeChanged$.unsubscribeAll();
            this.beforeDetectChanges$.unsubscribeAll();
            this.onChangesDetected$.unsubscribeAll();
            this.onMsg$.unsubscribeAll();
            this.onParentChanelReady$.unsubscribeAll();
        }

        attributeChangedCallback(name: string, oldValue: any, newValue: any) {
            this.attributeChanged$.next({name, oldValue, newValue});
        }

        adoptedCallback() {
            this.onAdopted$.next(true);
        }

        getElementsBoundToMethod(method: any): HTMLElement[] {
            if (!method) return [];
            if (!method.htmlElements) return [];
            if (!method.htmlElements[this.ahe_number]) return [];

            return <HTMLElement[]>(method.htmlElements[this.ahe_number]);
        }

        detectChanges(isForLost?: boolean): void {
            this.beforeDetectChanges$.next(true);
            !isForLost && this.ahe_ForOfList.length && changeForOf(this);
            changeIfConditions(this);
            changeClsConditions(this);
            changeBindValues(this);
            changeSource(this);
            changeSourceFunctions(this);
            changeBindFunctions(this);
            changeNestedValues(this);
            changeNestedFunctions(this);
            this.onChangesDetected$.next(true);
        }

        sendMessage<T>(data: T): void {
            this.onMsg$.next(data);
        }

        sendMessageToParent<T>(data: T): boolean {
            if (!this.ahe_parent_chanel) return false;
            this.ahe_parent_chanel.sendMessage(data);
            return true;
        }

        getChannel(element: any): IChannel | undefined {
            if (!element) return undefined;
            if ((<IAppElement>element).isCustomAppElement) return <IChannel>element;
            if (!(<RootElement>element).ahe_component) return undefined;
            if (!(<IChannel>element).sendMessage) return undefined;

            element.isCustomAppElement = true;

            return <IChannel>element;
        }

        transferToChannel<T, V>(chanelCb: () => IChannel, dataCb: (data: T) => V): void {
            this.onMessage$<T>()
                .pipe()
                .emitByPositive(() => chanelCb())
                .subscribe((data: T) => {
                    chanelCb().sendMessage<V>(
                        dataCb(data)
                    )
                });
        }

        sendToChannel<T>(chanel: IChannel, data: T): void {
            chanel && chanel.sendMessage<T>(data);
        }

        isAppElement(element: any): boolean {
            return !!this.getChannel(element);
        }

        collect(...subscriptionLikeList: ISubscriptionLike[]): void {
            this.ahe_clr.collect(...subscriptionLikeList);
        }

        destroy(): void {
            this.onAdopted$.destroy();
            this.attributeChanged$.destroy();
            this.ahe_clr.destroy();
        }
    }

    return RootHtmlElement;
}
