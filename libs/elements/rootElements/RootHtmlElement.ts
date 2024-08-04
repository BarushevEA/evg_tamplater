import {IObservablePipe, ISubscriber, ISubscriptionLike} from "evg_observable/src/outLib/Types";
import {Collector, Observable} from "evg_observable";
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
    clearProperties,
    detectInjectedData,
    getAttr,
    removeAttr
} from "./rootUtils";
import {
    AttributeChanged,
    ClassIf,
    ELEMENT_OPTIONS,
    ForOf,
    IAppElement,
    IChanelListener,
    IChannel,
    NestedValue,
    OnIf,
    RootElement
} from "../../env/types";
import {E_DATA_MARKER} from "../../enums/E_DATA_MARKER";
import {E_ROOT_TAG} from "../../enums/E_ROOT_TAG";
import {ifDoubleInitVar, txtValBuffer, txtValBufferLength} from "../../env/env";

let ahe_Counter = 0;

export function getCustomElement(options: ELEMENT_OPTIONS): CustomElementConstructor {
    class RootHtmlElement extends HTMLElement implements RootElement {
        ahe_nmr = 0;
        private ahe_opts: ELEMENT_OPTIONS;

        ahe_nVls: NestedValue[];
        ahe_nFns: NestedValue[];
        ahe_srcCms: NestedValue[];
        ahe_srcCmsFns: NestedValue[];
        ahe_bndVls: NestedValue[];
        ahe_bndFns: NestedValue[];
        ahe_IfLst: OnIf[];
        ahe_ClsIfLst: ClassIf[];
        ahe_ForOfLst: ForOf[];

        ahe_clr: Collector;
        ahe_cmt: any;
        ahe_pnt_chl: IChannel;

        ahe_onAdt$: Observable<boolean>;
        ahe_bfrIni$: Observable<boolean>;
        ahe_bfrDst$: Observable<boolean>;
        ahe_atrChd$: Observable<AttributeChanged | undefined>;
        ahe_bfrDctChg$: Observable<boolean>;
        ahe_onChgDtd$: Observable<boolean>;
        ahe_onMsg$: Observable<any>;
        ahe_onPChlRdy$: Observable<IChannel>;

        constructor() {
            super();

            if (this.tagName === E_ROOT_TAG.TEXT_VALUE) return;
            if (this.tagName === E_ROOT_TAG.QSI_BIND) return;

            this.ahe_opts = options;
            this.ahe_cmt = new options.element(this);
            if (this.tagName === E_ROOT_TAG.APP_ROUTE) return;

            this.ahe_nmr = ahe_Counter;
            ahe_Counter++;

            (<any>this).ahe_isCustomAppElement = true;

            this.ahe_clr = new Collector();
            this.ahe_onAdt$ = new Observable(false);
            this.ahe_bfrIni$ = new Observable(false);
            this.ahe_bfrDst$ = new Observable(false);
            this.ahe_atrChd$ = new Observable(undefined);
            this.ahe_bfrDctChg$ = new Observable(false);
            this.ahe_onChgDtd$ = new Observable(false);
            this.ahe_onMsg$ = new Observable(undefined);
            this.ahe_onPChlRdy$ = new Observable(undefined);

            this.ahe_nFns = [];
            this.ahe_srcCmsFns = [];
            this.ahe_srcCms = [];
            this.ahe_nVls = [];
            this.ahe_bndFns = [];
            this.ahe_bndVls = [];
            this.ahe_IfLst = [];
            this.ahe_ClsIfLst = [];
            this.ahe_ForOfLst = [];

            if ("onCreate" in this.ahe_cmt) this.ahe_cmt.onCreate();
        }

        parentChanelReady$(): ISubscriber<IChannel> & IObservablePipe<IChannel> {
            return this.ahe_onPChlRdy$;
        }

        adopted$(): ISubscriber<boolean> & IObservablePipe<boolean> {
            return this.ahe_onAdt$;
        }

        beforeInit$(): ISubscriber<boolean> & IObservablePipe<boolean> {
            return this.ahe_bfrIni$;
        }

        beforeDestroy$(): ISubscriber<boolean> & IObservablePipe<boolean> {
            return this.ahe_bfrDst$;
        }

        attributeChange$(): ISubscriber<AttributeChanged | undefined> & IObservablePipe<AttributeChanged | undefined> {
            return this.ahe_atrChd$;
        }

        beforeChanges$(): ISubscriber<boolean> & IObservablePipe<boolean> {
            return this.ahe_bfrDctChg$;
        }

        changesDetected$(): ISubscriber<boolean> & IObservablePipe<boolean> {
            return this.ahe_onChgDtd$;
        }

        onMessage$<T>(): IChanelListener<T> {
            return <any>this.ahe_onMsg$;
        }

        connectedCallback() {
            if (this.tagName === E_ROOT_TAG.TEXT_VALUE) return;
            if (this.tagName === E_ROOT_TAG.QSI_BIND) return;
            if (this.tagName === E_ROOT_TAG.APP_ROUTE) {
                this.ahe_cmt.onInit();
                return;
            }
            if (getAttr(this, E_DATA_MARKER.ON_IF)) {
                if (!this.ahe_cmt[ifDoubleInitVar]) return;
            }

            this.ahe_bfrIni$.next(true);

            if (this.ahe_opts.template) this.innerHTML = this.ahe_opts.template;

            detectInjectedData(this);

            if ("onMessage" in this.ahe_cmt) {
                this.collect(this.ahe_onMsg$.subscribe(message => this.ahe_cmt.onMessage(message)));
            }
            if ("onInit" in this.ahe_cmt) this.ahe_cmt.onInit();

            this.detectChanges(true);
        }

        disconnectedCallback() {
            if (this.tagName === E_ROOT_TAG.TEXT_VALUE) {
                if (txtValBuffer.length >= txtValBufferLength) return;
                if (this.innerHTML == "") {
                    removeAttr(this, E_DATA_MARKER.INFO);
                    txtValBuffer.push(this);
                }
                return;
            }
            if (this.tagName === E_ROOT_TAG.QSI_BIND) return;
            if (this.tagName === E_ROOT_TAG.APP_ROUTE) return;
            if (getAttr(this, E_DATA_MARKER.ON_IF)) {
                if (!this.ahe_cmt[ifDoubleInitVar]) {
                    this.ahe_cmt[ifDoubleInitVar] = true;
                    return;
                }
            }

            this.ahe_bfrDst$.next(true);

            clearProperties(this);

            this.ahe_clr.unsubscribeAll();
            this.ahe_onAdt$.unsubscribeAll();
            this.ahe_bfrIni$.unsubscribeAll();
            this.ahe_bfrDst$.unsubscribeAll();
            this.ahe_atrChd$.unsubscribeAll();
            this.ahe_bfrDctChg$.unsubscribeAll();
            this.ahe_onChgDtd$.unsubscribeAll();
            this.ahe_onMsg$.unsubscribeAll();
            this.ahe_onPChlRdy$.unsubscribeAll();

            if ("onDestroy" in this.ahe_cmt) this.ahe_cmt.onDestroy();
        }

        attributeChangedCallback(name: string, oldValue: any, newValue: any) {
            this.ahe_atrChd$?.next({name, oldValue, newValue});
        }

        adoptedCallback() {
            this.ahe_onAdt$?.next(true);
        }

        getElementsBoundToMethod(method: any): HTMLElement[] {
            if (!method) return [];
            if (!method.htmlElements) return [];
            if (!method.htmlElements[this.ahe_nmr]) return [];

            return <HTMLElement[]>(method.htmlElements[this.ahe_nmr]);
        }

        detectChanges(isForLost?: boolean): void {
            this.ahe_bfrDctChg$.next(true);
            !isForLost && this.ahe_ForOfLst.length && changeForOf(this);
            changeIfConditions(this);
            changeClsConditions(this);
            changeBindValues(this);
            changeSource(this);
            changeSourceFunctions(this);
            changeBindFunctions(this);
            changeNestedValues(this);
            changeNestedFunctions(this);
            this.ahe_onChgDtd$.next(true);
        }

        sendMessage<T>(data: T): void {
            this.ahe_onMsg$.next(data);
        }

        sendMessageToParent<T>(data: T): boolean {
            if (!this.ahe_pnt_chl) return false;
            this.ahe_pnt_chl.sendMessage(data);
            return true;
        }

        getChannel(element: any): IChannel | undefined {
            if (!element) return undefined;
            if (!(<IAppElement>element).ahe_isCustomAppElement) return undefined;

            return <IChannel>element;
        }

        transferToChannel<T, V>(chanelCb: () => IChannel, dataCb: (data: T) => V): void {
            this.onMessage$<T>()
                .pipe()
                .refine(() => chanelCb())
                .subscribe((data: T) => {
                    chanelCb().sendMessage<V>(dataCb(data));
                });
        }

        sendToChannel<T>(chanel: IChannel, data: T): void {
            chanel?.sendMessage<T>(data);
        }

        isAppElement(element: any): boolean {
            return !!element?.ahe_isCustomAppElement;
        }

        collect(...subscriptionLikeList: ISubscriptionLike[]): void {
            this.ahe_clr.collect(...subscriptionLikeList);
        }

        destroy(): void {
            clearProperties(this);

            this.ahe_onAdt$.destroy();
            this.ahe_bfrIni$.destroy();
            this.ahe_bfrDst$.destroy();
            this.ahe_atrChd$.destroy();
            this.ahe_bfrDctChg$.destroy();
            this.ahe_onChgDtd$.destroy();
            this.ahe_onMsg$.destroy();
            this.ahe_onPChlRdy$.destroy();
            this.ahe_clr.destroy();
        }
    }

    return RootHtmlElement;
}
