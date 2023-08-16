import {ISubscriptionLike} from "evg_observable/src/outLib/Types";
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
import {RootElement} from "../../env/types";

export function getCustomElement(options: ELEMENT_OPTIONS): CustomElementConstructor {
    class RootHtmlElement extends HTMLElement implements RootElement {
        static ahe_Counter = 0;
        ahe_number = 0;
        private ahe_opts: ELEMENT_OPTIONS;
        ahe_nValues: NestedValue[];
        ahe_nFunctions: NestedValue[];
        ahe_IfList: OnIf[];
        ahe_clr: Collector;
        ahe_component: any;

        onAdopted$: Observable<boolean>;
        attributeChanged$: Observable<AttributeChanged | undefined>;
        beforeDetectChanges$: Observable<boolean>;
        onChangesDetected$: Observable<boolean>;

        constructor() {
            super();

            this.ahe_number = RootHtmlElement.ahe_Counter;
            RootHtmlElement.ahe_Counter++;

            this.onAdopted$ = new Observable(false);
            this.attributeChanged$ = new Observable(undefined);
            this.beforeDetectChanges$ = new Observable(false);
            this.onChangesDetected$ = new Observable(false);
            this.ahe_clr = new Collector();
            this.ahe_nFunctions = [];
            this.ahe_nValues = [];
            this.ahe_IfList = [];

            this.ahe_opts = options;
            this.ahe_component = new options.element(this);

            if (this.ahe_component.onCreate) this.ahe_component.onCreate();
        }

        connectedCallback() {
            // браузер вызывает этот метод при добавлении элемента в документ
            // (может вызываться много раз, если элемент многократно добавляется/удаляется)

            if (this.ahe_opts.template) {
                this.innerHTML = this.ahe_opts.template;
            }

            initCustomAttributes(this);
            detectNestedData(this);

            if (this.ahe_component.onInit) this.ahe_component.onInit();
        }

        disconnectedCallback() {
            // браузер вызывает этот метод при удалении элемента из документа
            // (может вызываться много раз, если элемент многократно добавляется/удаляется)

            if (this.ahe_component.onDestroy) this.ahe_component.onDestroy();
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
            changeNestedFunctions(this);
            this.onChangesDetected$.next(true);
        }

        collect(...subscriptionLikeList: ISubscriptionLike<any>[]): void {
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

function detectNestedData(rootElement: RootElement): void {
    const children = getFreeChildren(rootElement);

    for (const child of children) {
        setAttr(child, E_DATA_MARKER.ROLE, rootElement.tagName.toLowerCase());
        detectVariables(rootElement, child);
        detectClickHandlers(rootElement, <HTMLElement>child);
        detectMouseLeaveHandlers(rootElement, <HTMLElement>child);
        detectMouseEnterHandlers(rootElement, <HTMLElement>child);
        detectMouseUpHandlers(rootElement, <HTMLElement>child);
        detectMouseDownHandlers(rootElement, <HTMLElement>child);
        detectMouseMoveHandlers(rootElement, <HTMLElement>child);
        detectKeyDownHandlers(rootElement, <HTMLElement>child);
        detectKeyUpHandlers(rootElement, <HTMLElement>child);
        detectDblClickHandlers(rootElement, <HTMLElement>child);
        detectScrollHandlers(rootElement, <HTMLElement>child);
        detectWheelHandlers(rootElement, <HTMLElement>child);
        detectChangeHandlers(rootElement, <HTMLElement>child);
        detectElementHandlers(rootElement, <HTMLElement>child);
        detectIfConditions(rootElement, <HTMLElement>child);
    }

    rootElement.detectChanges();
}

function detectIfConditions(rootElement: RootElement, element: HTMLElement) {
    const valueName = getAttr(element, E_DATA_MARKER.ON_IF);
    if (!valueName) return;

    const ifParent = AppDocument.createElement(E_ROOT_TAG.TEXT_VALUE);
    const htmlParent = element.parentElement;

    rootElement.ahe_IfList.push({
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

function initCustomAttributes(rootElement: RootElement): void {
    if (rootElement.tagName.toLowerCase() === E_ROOT_TAG.TEXT_VALUE) return;

    setAttr(rootElement, E_DATA_MARKER.ROLE, "root");
}

function detectVariables(rootElement: RootElement, element: Element): void {
    if (element.tagName.toLowerCase() === E_ROOT_TAG.TEXT_VALUE) {
        if (element.innerHTML) {
            const value = element.innerHTML;

            if (typeof rootElement.ahe_component[value] === "function") {
                rootElement.ahe_nFunctions.push({
                    textElement: <HTMLElement>element,
                    valueName: element.innerHTML
                });

                return;
            }

            rootElement.ahe_nValues.push({
                textElement: <HTMLElement>element,
                valueName: element.innerHTML
            });
        }
    }
}

function execute(rootElement: RootElement, functionName: string, evt: MouseEvent | KeyboardEvent | Event) {
    rootElement.ahe_component[functionName](evt);
}

function detectClickHandlers(rootElement: RootElement, element: HTMLElement): void {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_CLICK);
    if (functionName) element.onclick = (evt) => execute(rootElement, functionName, evt);
}

function detectMouseLeaveHandlers(rootElement: RootElement, element: HTMLElement): void {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_MOUSE_LEAVE);
    if (functionName) element.onmouseleave = (evt) => execute(rootElement, functionName, evt);
}

function detectMouseEnterHandlers(rootElement: RootElement, element: HTMLElement): void {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_MOUSE_ENTER);
    if (functionName) element.onmouseenter = (evt) => execute(rootElement, functionName, evt);
}

function detectMouseUpHandlers(rootElement: RootElement, element: HTMLElement): void {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_MOUSE_UP);
    if (functionName) element.onmouseup = (evt) => execute(rootElement, functionName, evt);
}

function detectMouseDownHandlers(rootElement: RootElement, element: HTMLElement): void {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_MOUSE_DOWN);
    if (functionName) element.onmousedown = (evt) => execute(rootElement, functionName, evt);
}

function detectMouseMoveHandlers(rootElement: RootElement, element: HTMLElement): void {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_MOUSE_MOVE);
    if (functionName) element.onmousemove = (evt) => execute(rootElement, functionName, evt);
}

function detectKeyDownHandlers(rootElement: RootElement, element: HTMLElement): void {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_KEY_DOWN);
    if (functionName) element.onkeydown = (evt) => execute(rootElement, functionName, evt);
}

function detectKeyUpHandlers(rootElement: RootElement, element: HTMLElement): void {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_KEY_UP);
    if (functionName) element.onkeyup = (evt) => execute(rootElement, functionName, evt);
}

function detectDblClickHandlers(rootElement: RootElement, element: HTMLElement): void {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_KEY_DBL_CLICK);
    if (functionName) element.ondblclick = (evt) => execute(rootElement, functionName, evt);
}

function detectScrollHandlers(rootElement: RootElement, element: HTMLElement): void {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_SCROLL);
    if (functionName) element.onscroll = (evt) => execute(rootElement, functionName, evt);
}

function detectWheelHandlers(rootElement: RootElement, element: HTMLElement): void {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_WHEEL);
    if (functionName) element.onwheel = (evt) => execute(rootElement, functionName, evt);
}

function detectChangeHandlers(rootElement: RootElement, element: HTMLElement): void {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_CHANGE);
    if (functionName) element.onchange = (evt) => execute(rootElement, functionName, evt);
}

function getFunctionName(rootElement: RootElement, element: HTMLElement, marker: E_DATA_MARKER): string {
    const functionName = getAttr(element, marker);
    if (!functionName) return "";
    if (!rootElement) return "";

    bindElementToMethod(rootElement, functionName, element);
    removeAttr(element, marker);

    return functionName;
}

function detectElementHandlers(rootElement: RootElement, element: HTMLElement) {
    const functionName = getAttr(element, E_DATA_MARKER.ON_HANDLE);
    if (!functionName) return;
    if (!rootElement) return;

    bindElementToMethod(rootElement, functionName, element);
    removeAttr(element, E_DATA_MARKER.ON_HANDLE);
}

function bindElementToMethod(rootElement: any, functionName: string, element: HTMLElement) {
    const method = rootElement.ahe_component[functionName];
    if (!method) return;

    if (!method.htmlElements) {
        method.htmlElements = {};
    }
    if (!method.htmlElements[rootElement.ahe_number]) {
        method.htmlElements[rootElement.ahe_number] = [];
    }
    method.htmlElements[rootElement.ahe_number].push(element);
}

function changeNestedValues(rootElement: RootElement): void {
    if (!rootElement) return;

    for (const nestedValue of rootElement.ahe_nValues) {

        const nestedData = "" + rootElement.ahe_component[nestedValue.valueName];
        if (nestedValue.textElement.innerHTML === nestedData) continue;

        nestedValue.textElement.innerHTML = nestedData;
    }
}

function changeNestedFunctions(rootElement: RootElement): void {
    if (!rootElement) return;

    for (const nestedValue of rootElement.ahe_nFunctions) {

        const nestedData = "" + rootElement.ahe_component[nestedValue.valueName]();
        if (nestedValue.textElement.innerHTML === nestedData) continue;

        nestedValue.textElement.innerHTML = nestedData;
    }
}

function changeIfConditions(rootElement: RootElement) {
    if (!rootElement) return;

    for (const onIf of rootElement.ahe_IfList) {
        const conditionData = !!(<any>rootElement.ahe_component)[onIf.valueName];
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
