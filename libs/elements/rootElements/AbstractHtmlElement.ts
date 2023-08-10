import {IListener, ISubscriptionLike} from "evg_observable/src/outLib/Types";
import {History} from "evg_event_history/src/outLib/history";
import {Observable} from "evg_observable/src/outLib/Observable";
import {
    AttributeChanged,
    E_DATA_MARKER,
    E_ROOT_TAG,
    ELEMENT_OPTIONS,
    getAttr,
    getAttrName,
    NestedValue,
    OnIf,
    removeAttr,
    setAttr
} from "../utils";
import {Collector} from "evg_observable/src/outLib/Collector";
import {appendChild, removeChild} from "../../utils/utils";
import {AppDocument} from "../../env/browserVariables";

export abstract class AbstractHtmlElement<T> extends HTMLElement {
    static ahe_Counter = 0;
    ahe_number = 0;
    private ahe_evt: History<T>;
    private ahe_opts: ELEMENT_OPTIONS<T>;
    ahe_nValues: NestedValue[];
    ahe_IfList: OnIf[];
    ahe_clr: Collector;

    onAdopted$: Observable<boolean>;
    attributeChanged$: Observable<AttributeChanged | undefined>;
    beforeDetectChanges$: Observable<boolean>;
    onChangesDetected$: Observable<boolean>;

    protected constructor(options: ELEMENT_OPTIONS<T>) {
        super();

        this.ahe_number = AbstractHtmlElement.ahe_Counter;
        AbstractHtmlElement.ahe_Counter++;

        this.ahe_evt = new History<T>(options.startEvent, 50);

        this.onAdopted$ = new Observable(false);
        this.attributeChanged$ = new Observable(undefined);
        this.beforeDetectChanges$ = new Observable(false);
        this.onChangesDetected$ = new Observable(false);
        this.ahe_clr = new Collector();
        this.ahe_nValues = [];
        this.ahe_IfList = [];

        this.ahe_opts = options;

        this.onCreate();
    }

    connectedCallback() {
        // браузер вызывает этот метод при добавлении элемента в документ
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)

        if (this.ahe_opts.htmlTemplate) {
            this.innerHTML = this.ahe_opts.htmlTemplate;
        }

        initCustomAttributes(this);
        detectNestedData(this);

        this.onInit();
    }

    disconnectedCallback() {
        // браузер вызывает этот метод при удалении элемента из документа
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)

        this.onDestroy();
        this.ahe_clr.unsubscribeAll();
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        // вызывается при изменении одного из перечисленных выше атрибутов

        this.attributeChanged$.next({
            name,
            oldValue,
            newValue
        })
    }

    adoptedCallback() {
        // вызывается, когда элемент перемещается в новый документ
        // (происходит в document.adoptNode, используется очень редко)

        this.onAdopted$.next(true);
    }

    get state(): T {
        return this.ahe_evt.state;
    }

    set state(value: T) {
        this.ahe_evt.state = value;
    }

    eventSubscribe$(subscriber: IListener<T>): ISubscriptionLike<T> | undefined {
        return this.ahe_evt.eventSubscribe$(subscriber);
    }

    getHistory(): T[] {
        return this.ahe_evt.getHistory();
    }

    isHistoryIncludes(state: T): boolean {
        return this.ahe_evt.isHistoryIncludes(state);
    }

    stateForHistory(state: T): void {
        this.ahe_evt.stateForHistory(state);
    }

    abstract onCreate(): void;

    abstract onInit(): void;

    abstract onDestroy(): void;

    getElementsBoundToMethod(method: any): HTMLElement[] {
        if (!method) return [];
        if (!method.htmlElements) return [];
        if (!method.htmlElements[this.ahe_number]) return [];

        return <HTMLElement[]>(method.htmlElements[this.ahe_number])
    }

    detectChanges(): void {
        this.beforeDetectChanges$.next(true);
        changeIfConditions(this);
        changeNestedValues(this);
        this.onChangesDetected$.next(true);
    }

    collect(...subscriptionLikeList: ISubscriptionLike<any>[]): void {
        this.ahe_clr.collect(...subscriptionLikeList);
    }

    destroy(): void {
        this.ahe_evt.destroy();
        this.onAdopted$.destroy();
        this.attributeChanged$.destroy();
        this.ahe_clr.destroy();
    }
}

function detectNestedData(abElement: AbstractHtmlElement<any>): void {
    const children = getFreeChildren(abElement);

    for (const child of children) {
        setAttr(child, E_DATA_MARKER.ROLE, abElement.tagName.toLowerCase());
        detectVariables(abElement, child);
        detectClickHandlers(abElement, <HTMLElement>child);
        detectMouseLeaveHandlers(abElement, <HTMLElement>child);
        detectMouseEnterHandlers(abElement, <HTMLElement>child);
        detectMouseUpHandlers(abElement, <HTMLElement>child);
        detectMouseDownHandlers(abElement, <HTMLElement>child);
        detectMouseMoveHandlers(abElement, <HTMLElement>child);
        detectKeyDownHandlers(abElement, <HTMLElement>child);
        detectKeyUpHandlers(abElement, <HTMLElement>child);
        detectDblClickHandlers(abElement, <HTMLElement>child);
        detectScrollHandlers(abElement, <HTMLElement>child);
        detectWheelHandlers(abElement, <HTMLElement>child);
        detectChangeHandlers(abElement, <HTMLElement>child);
        detectElementHandlers(abElement, <HTMLElement>child);
        detectIfConditions(abElement, <HTMLElement>child);
    }

    abElement.detectChanges();
}

function detectIfConditions(abElement: AbstractHtmlElement<any>, element: HTMLElement) {
    const valueName = getAttr(element, E_DATA_MARKER.ON_IF);
    if (!valueName) return;

    const ifParent = AppDocument.createElement("text-value");
    const htmlParent = element.parentElement;

    abElement.ahe_IfList.push({
        ifElement: element,
        valueName: valueName,
        ifParent: ifParent,
        oldCondition: false,
    });

    htmlParent.insertBefore(ifParent, element);
    removeChild(htmlParent, element);
    removeAttr(element, E_DATA_MARKER.ON_IF);
}

function getFreeChildren(parent: HTMLElement): Element[] {
    return Array.from(parent.querySelectorAll(`*:not([${getAttrName(E_DATA_MARKER.ROLE)}])`));
}

function initCustomAttributes(abElement: AbstractHtmlElement<any>): void {
    if (abElement.tagName.toLowerCase() === E_ROOT_TAG.TEXT_VALUE) return;
    setAttr(abElement, E_DATA_MARKER.ROLE, "root");
}

function detectVariables(abElement: AbstractHtmlElement<any>, element: Element): void {
    if (element.tagName.toLowerCase() === E_ROOT_TAG.TEXT_VALUE) {
        if (element.innerHTML) {
            abElement.ahe_nValues.push({
                textElement: <HTMLElement>element,
                valueName: element.innerHTML
            });
        }
    }
}

function detectClickHandlers(abElement: AbstractHtmlElement<any>, element: HTMLElement): void {
    const functionName = getFunctionName(abElement, element, E_DATA_MARKER.ON_CLICK);
    if (functionName) element.onclick = (evt) => (<any>abElement)[functionName](evt);
}

function detectMouseLeaveHandlers(abElement: AbstractHtmlElement<any>, element: HTMLElement): void {
    const functionName = getFunctionName(abElement, element, E_DATA_MARKER.ON_MOUSE_LEAVE);
    if (functionName) element.onmouseleave = (evt) => (<any>abElement)[functionName](evt);
}

function detectMouseEnterHandlers(abElement: AbstractHtmlElement<any>, element: HTMLElement): void {
    const functionName = getFunctionName(abElement, element, E_DATA_MARKER.ON_MOUSE_ENTER);
    if (functionName) element.onmouseenter = (evt) => (<any>abElement)[functionName](evt);
}

function detectMouseUpHandlers(abElement: AbstractHtmlElement<any>, element: HTMLElement): void {
    const functionName = getFunctionName(abElement, element, E_DATA_MARKER.ON_MOUSE_UP);
    if (functionName) element.onmouseup = (evt) => (<any>abElement)[functionName](evt);
}

function detectMouseDownHandlers(abElement: AbstractHtmlElement<any>, element: HTMLElement): void {
    const functionName = getFunctionName(abElement, element, E_DATA_MARKER.ON_MOUSE_DOWN);
    if (functionName) element.onmousedown = (evt) => (<any>abElement)[functionName](evt);
}

function detectMouseMoveHandlers(abElement: AbstractHtmlElement<any>, element: HTMLElement): void {
    const functionName = getFunctionName(abElement, element, E_DATA_MARKER.ON_MOUSE_MOVE);
    if (functionName) element.onmousemove = (evt) => (<any>abElement)[functionName](evt);
}

function detectKeyDownHandlers(abElement: AbstractHtmlElement<any>, element: HTMLElement): void {
    const functionName = getFunctionName(abElement, element, E_DATA_MARKER.ON_KEY_DOWN);
    if (functionName) element.onkeydown = (evt) => (<any>abElement)[functionName](evt);
}

function detectKeyUpHandlers(abElement: AbstractHtmlElement<any>, element: HTMLElement): void {
    const functionName = getFunctionName(abElement, element, E_DATA_MARKER.ON_KEY_UP);
    if (functionName) element.onkeyup = (evt) => (<any>abElement)[functionName](evt);
}

function detectDblClickHandlers(abElement: AbstractHtmlElement<any>, element: HTMLElement): void {
    const functionName = getFunctionName(abElement, element, E_DATA_MARKER.ON_KEY_DBL_CLICK);
    if (functionName) element.ondblclick = (evt) => (<any>abElement)[functionName](evt);
}

function detectScrollHandlers(abElement: AbstractHtmlElement<any>, element: HTMLElement): void {
    const functionName = getFunctionName(abElement, element, E_DATA_MARKER.ON_SCROLL);
    if (functionName) element.onscroll = (evt) => (<any>abElement)[functionName](evt);
}

function detectWheelHandlers(abElement: AbstractHtmlElement<any>, element: HTMLElement): void {
    const functionName = getFunctionName(abElement, element, E_DATA_MARKER.ON_WHEEL);
    if (functionName) element.onwheel = (evt) => (<any>abElement)[functionName](evt);
}

function detectChangeHandlers(abElement: AbstractHtmlElement<any>, element: HTMLElement): void {
    const functionName = getFunctionName(abElement, element, E_DATA_MARKER.ON_CHANGE);
    if (functionName) element.onchange = (evt) => (<any>abElement)[functionName](evt);
}

function getFunctionName(abElement: AbstractHtmlElement<any>, element: HTMLElement, marker: E_DATA_MARKER): string {
    const functionName = getAttr(element, marker);
    if (!functionName) return "";
    if (!abElement) return "";

    bindElementToMethod(abElement, functionName, element);
    removeAttr(element, marker);

    return functionName;
}

function detectElementHandlers(abElement: AbstractHtmlElement<any>, element: HTMLElement) {
    const functionName = getAttr(element, E_DATA_MARKER.ON_HANDLE);
    if (!functionName) return;
    if (!abElement) return;

    bindElementToMethod(abElement, functionName, element);
    removeAttr(element, E_DATA_MARKER.ON_HANDLE);
}

function bindElementToMethod(abElement: AbstractHtmlElement<any>, functionName: string, element: HTMLElement) {
    const method = (<any>abElement)[functionName];
    if (!method) return;

    if (!method.htmlElements) {
        method.htmlElements = {};
    }
    if (!method.htmlElements[abElement.ahe_number]) {
        method.htmlElements[abElement.ahe_number] = [];
    }
    method.htmlElements[abElement.ahe_number].push(element);
}

function changeNestedValues(abElement: AbstractHtmlElement<any>): void {
    if (!abElement) return;

    for (const nestedValue of abElement.ahe_nValues) {

        const nestedData = "" + (<any>abElement)[nestedValue.valueName];
        if (nestedValue.textElement.innerHTML === nestedData) continue;

        nestedValue.textElement.innerHTML = nestedData;
    }
}

function changeIfConditions(abElement: AbstractHtmlElement<any>) {
    if (!abElement) return;

    for (const onIf of abElement.ahe_IfList) {
        const conditionData = !!(<any>abElement)[onIf.valueName];
        if (conditionData === onIf.oldCondition) continue;

        const isContains = onIf.ifParent.contains(onIf.ifElement);

        if (conditionData) {
            if (!isContains) appendChild(onIf.ifParent, onIf.ifElement);
        } else {
            if (isContains) removeChild(onIf.ifParent, onIf.ifElement);
        }

        onIf.oldCondition = conditionData;
    }
}
