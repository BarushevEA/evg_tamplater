import {ISubscriptionLike} from "evg_observable/src/outLib/Types";
import {Observable} from "evg_observable/src/outLib/Observable";
import {CONDITION, E_DATA_MARKER, E_ROOT_TAG, getAttr, getAttrName, removeAttr, setAttr} from "../utils";
import {Collector} from "evg_observable/src/outLib/Collector";
import {appendChild, removeChild} from "../../utils/utils";
import {AppDocument} from "../../env/browserVariables";
import {
    AttributeChanged,
    ClassCondition,
    ClassIf,
    ELEMENT_OPTIONS,
    NestedValue,
    OnIf,
    RootElement,
    ValDetails
} from "../../env/types";
import {clsSeparator} from "../../env/env";

const ifDoubleInitVar = "_______$$bool";

export function getCustomElement(options: ELEMENT_OPTIONS): CustomElementConstructor {
    class RootHtmlElement extends HTMLElement implements RootElement {
        static ahe_Counter = 0;
        ahe_number = 0;
        private ahe_opts: ELEMENT_OPTIONS;
        ahe_nValues: NestedValue[];
        ahe_nFunctions: NestedValue[];
        ahe_IfList: OnIf[];
        ahe_ClsIfList: ClassIf[];
        ahe_clr: Collector;
        ahe_component: any;

        onAdopted$: Observable<boolean>;
        onInit$: Observable<boolean>;
        onDestroy$: Observable<boolean>;
        attributeChanged$: Observable<AttributeChanged | undefined>;
        beforeDetectChanges$: Observable<boolean>;
        onChangesDetected$: Observable<boolean>;

        constructor() {
            super();

            this.ahe_number = RootHtmlElement.ahe_Counter;
            RootHtmlElement.ahe_Counter++;

            this.onAdopted$ = new Observable(false);
            this.onInit$ = new Observable(false);
            this.onDestroy$ = new Observable(false);
            this.attributeChanged$ = new Observable(undefined);
            this.beforeDetectChanges$ = new Observable(false);
            this.onChangesDetected$ = new Observable(false);
            this.ahe_clr = new Collector();
            this.ahe_nFunctions = [];
            this.ahe_nValues = [];
            this.ahe_IfList = [];
            this.ahe_ClsIfList = [];

            this.ahe_opts = options;
            this.ahe_component = new options.element(this);

            if (this.ahe_component.onCreate) this.ahe_component.onCreate();
        }

        connectedCallback() {
            if (getAttr(this, E_DATA_MARKER.ON_IF)) {
                if (!this.ahe_component[ifDoubleInitVar]) return;
            }

            if (this.ahe_opts.template) this.innerHTML = this.ahe_opts.template;
            if (this.tagName.toLowerCase() === E_ROOT_TAG.TEXT_VALUE) return;

            detectInjectedData(this);
            this.detectChanges();

            this.onInit$.next(true);
            if (this.ahe_component.onInit) this.ahe_component.onInit();
        }

        disconnectedCallback() {
            if (getAttr(this, E_DATA_MARKER.ON_IF)) {
                if (!this.ahe_component[ifDoubleInitVar]) {
                    this.ahe_component[ifDoubleInitVar] = true;
                    return;
                }
            }

            if (this.tagName.toLowerCase() === E_ROOT_TAG.TEXT_VALUE) return;

            this.onDestroy$.next(true);
            if (this.ahe_component.onDestroy) this.ahe_component.onDestroy();

            this.ahe_clr.unsubscribeAll();
            this.ahe_nFunctions.length = 0;
            this.ahe_nValues.length = 0;
            this.ahe_IfList.length = 0;
            this.ahe_ClsIfList.length = 0;
            this.innerHTML = "";
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

        detectChanges(): void {
            this.beforeDetectChanges$.next(true);
            changeIfConditions(this);
            changeClsConditions(this);
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

function detectInjectedData(rootElement: RootElement): void {
    const children = getFreeChildren(rootElement);

    for (const child of children) {
        let actions = "[";
        if (!detectVariables(rootElement, child)) {
            actions += detectInjections(rootElement, <HTMLElement>child);
            actions += detectClickHandlers(rootElement, <HTMLElement>child);
            actions += detectMouseLeaveHandlers(rootElement, <HTMLElement>child);
            actions += detectMouseEnterHandlers(rootElement, <HTMLElement>child);
            actions += detectMouseUpHandlers(rootElement, <HTMLElement>child);
            actions += detectMouseDownHandlers(rootElement, <HTMLElement>child);
            actions += detectMouseMoveHandlers(rootElement, <HTMLElement>child);
            actions += detectKeyDownHandlers(rootElement, <HTMLElement>child);
            actions += detectKeyUpHandlers(rootElement, <HTMLElement>child);
            actions += detectDblClickHandlers(rootElement, <HTMLElement>child);
            actions += detectScrollHandlers(rootElement, <HTMLElement>child);
            actions += detectWheelHandlers(rootElement, <HTMLElement>child);
            actions += detectChangeHandlers(rootElement, <HTMLElement>child);
            actions += detectElementHandlers(rootElement, <HTMLElement>child);
            actions += detectIfConditions(rootElement, <HTMLElement>child);
            actions += detectClsConditions(rootElement, <HTMLElement>child);
            setAttr(child, E_DATA_MARKER.ROLE, actions.trim() + "]");
        } else {
            setAttr(child, E_DATA_MARKER.ROLE, actions + "var]");
        }
    }
}

function detectClsConditions(rootElement: RootElement, element: HTMLElement): string {
    let classData = getAttr(element, E_DATA_MARKER.CLASS_IF);
    if (!classData) return "";

    const strConditions = classData.split(" ");
    const clsConditions: ClassCondition[] = [];
    const clsIf: ClassIf = {
        element: element,
        classConditions: clsConditions,
    };

    for (const strCondition of strConditions) {
        if (strCondition.includes("?")) {
            const args = strCondition.split("?");
            const details = getDetails(rootElement, args[0]);
            const classes = args[1].split(clsSeparator);
            clsConditions.push({
                conditionName: details.valueName,
                isFunction: details.isFunction,
                isInversion: details.isInversion,
                isConditionDisabled: false,
                oldCondition: CONDITION.UNDEFINED,
                firstClassName: classes[0],
                secondClassName: classes[1],
            });
            continue;
        }

        if (strCondition.includes(clsSeparator)) {
            const args = strCondition.split(clsSeparator);
            const details = getDetails(rootElement, args[1]);
            clsConditions.push({
                conditionName: details.valueName,
                isFunction: details.isFunction,
                isInversion: details.isInversion,
                isConditionDisabled: false,
                oldCondition: CONDITION.UNDEFINED,
                firstClassName: args[0],
                secondClassName: "",
            });
            continue;
        }

        clsConditions.push({
            conditionName: "",
            isFunction: false,
            isInversion: false,
            isConditionDisabled: true,
            oldCondition: CONDITION.UNDEFINED,
            firstClassName: strCondition,
            secondClassName: "",
        });
    }

    rootElement.ahe_ClsIfList.push(clsIf);
    removeAttr(element, E_DATA_MARKER.CLASS_IF);

    return "cls ";
}

function detectIfConditions(rootElement: RootElement, element: HTMLElement): string {
    let valueName = getAttr(element, E_DATA_MARKER.ON_IF);
    if (!valueName) return "";

    const ifParent = AppDocument.createElement(E_ROOT_TAG.TEXT_VALUE);
    const htmlParent = element.parentElement;

    const details = getDetails(rootElement, valueName);

    rootElement.ahe_IfList.push({
        ifElement: element,
        valueName: details.valueName,
        ifParent: ifParent,
        oldCondition: false,
        isInversion: details.isInversion,
        isFunction: details.isFunction,
    });

    htmlParent.insertBefore(ifParent, element);
    removeChild(htmlParent, element);
    removeAttr(element, E_DATA_MARKER.ON_IF);

    setAttr(ifParent, E_DATA_MARKER.ROLE, "[ifp]");

    return "ifc ";
}

function getDetails(rootElement: RootElement, value: string): ValDetails {
    const isInversion = value[0] === "!";
    const name = isInversion ? value.substring(1) : value;
    return {
        isInversion: isInversion,
        valueName: name,
        isFunction: typeof rootElement.ahe_component[name] === "function"
    }
}

function getFreeChildren(parent: HTMLElement): Element[] {
    return Array.from(parent.querySelectorAll(`*:not([${getAttrName(E_DATA_MARKER.ROLE)}])`));
}

function detectVariables(rootElement: RootElement, element: Element): boolean {
    if (element.tagName.toLowerCase() === E_ROOT_TAG.TEXT_VALUE) {
        if (!element.innerHTML) return false;

        const details = getDetails(rootElement, element.innerHTML);

        if (details.isFunction) {
            rootElement.ahe_nFunctions.push({textElement: <HTMLElement>element, valueName: details.valueName});
            return true;
        }

        rootElement.ahe_nValues.push({textElement: <HTMLElement>element, valueName: details.valueName});
        return true;
    }
    return false;
}

function execute(rootElement: RootElement, functionName: string, evt: MouseEvent | KeyboardEvent | Event) {
    rootElement.ahe_component[functionName](evt);
}

function detectInjections(rootElement: RootElement, element: HTMLElement): string {
    const injectionName = getInjectionName(rootElement, element, E_DATA_MARKER.INJECT_TO);
    if (injectionName) {
        rootElement.ahe_component[injectionName] = element;
        return "inj ";
    }
    return "";
}

function detectClickHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_CLICK);
    if (functionName) {
        element.onclick = (evt) => execute(rootElement, functionName, evt);
        return "clk ";
    }
    return "";
}

function detectMouseLeaveHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_MOUSE_LEAVE);
    if (functionName) {
        element.onmouseleave = (evt) => execute(rootElement, functionName, evt);
        return "mlv ";
    }
    return "";
}

function detectMouseEnterHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_MOUSE_ENTER);
    if (functionName) {
        element.onmouseenter = (evt) => execute(rootElement, functionName, evt);
        return "mer ";
    }
    return "";
}

function detectMouseUpHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_MOUSE_UP);
    if (functionName) {
        element.onmouseup = (evt) => execute(rootElement, functionName, evt);
        return "mup ";
    }
    return "";
}

function detectMouseDownHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_MOUSE_DOWN);
    if (functionName) {
        element.onmousedown = (evt) => execute(rootElement, functionName, evt);
        return "mdn ";
    }
    return "";
}

function detectMouseMoveHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_MOUSE_MOVE);
    if (functionName) {
        element.onmousemove = (evt) => execute(rootElement, functionName, evt);
        return "mmv ";
    }
    return "";
}

function detectKeyDownHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_KEY_DOWN);
    if (functionName) {
        element.onkeydown = (evt) => execute(rootElement, functionName, evt);
        return "kdn ";
    }
    return "";
}

function detectKeyUpHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_KEY_UP);
    if (functionName) {
        element.onkeyup = (evt) => execute(rootElement, functionName, evt);
        return "kup ";
    }
    return "";
}

function detectDblClickHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_KEY_DBL_CLICK);
    if (functionName) {
        element.ondblclick = (evt) => execute(rootElement, functionName, evt);
        return "dbc ";
    }
    return "";
}

function detectScrollHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_SCROLL);
    if (functionName) {
        element.onscroll = (evt) => execute(rootElement, functionName, evt);
        return "scl ";
    }
    return "";
}

function detectWheelHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_WHEEL);
    if (functionName) {
        element.onwheel = (evt) => execute(rootElement, functionName, evt);
        return "whl ";
    }
    return "";
}

function detectChangeHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_CHANGE);
    if (functionName) {
        element.onchange = (evt) => execute(rootElement, functionName, evt);
        return "chg ";
    }
    return "";
}

function getFunctionName(rootElement: RootElement, element: HTMLElement, marker: E_DATA_MARKER): string {
    const functionName = getAttr(element, marker);
    if (!functionName) return "";
    if (!rootElement) return "";

    bindElementToMethod(rootElement, functionName, element);
    removeAttr(element, marker);

    return functionName;
}

function getInjectionName(rootElement: RootElement, element: HTMLElement, marker: E_DATA_MARKER): string {
    const injectionName = getAttr(element, marker);
    if (!injectionName) return "";
    if (!rootElement) return "";

    removeAttr(element, marker);

    return injectionName;
}

function detectElementHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getAttr(element, E_DATA_MARKER.ON_HANDLE);
    if (!functionName) return "";
    if (!rootElement) return "";

    bindElementToMethod(rootElement, functionName, element);
    removeAttr(element, E_DATA_MARKER.ON_HANDLE);
    return "elt ";
}

function bindElementToMethod(rootElement: RootElement, functionName: string, element: HTMLElement) {
    const method = rootElement.ahe_component[functionName];

    if (!method) return;
    if (!method.htmlElements) method.htmlElements = {};
    if (!method.htmlElements[rootElement.ahe_number]) method.htmlElements[rootElement.ahe_number] = [];

    rootElement.ahe_clr.collect(
        rootElement.onDestroy$.subscribe(isDestroy => isDestroy && (method.htmlElements = {}))
    );

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
        let conditionData = onIf.isFunction ?
            !!(<any>rootElement.ahe_component)[onIf.valueName]() :
            !!(<any>rootElement.ahe_component)[onIf.valueName];
        if (onIf.isInversion) conditionData = !conditionData;

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

function changeClsConditions(rootElement: RootElement) {
    if (!rootElement) return;

    for (const classIf of rootElement.ahe_ClsIfList) {
        const conditions = classIf.classConditions;
        const element = classIf.element;
        const handler = rootElement.ahe_component;
        for (const condition of conditions) {
            let conditionData: CONDITION;
            if (condition.isConditionDisabled) {
                conditionData = CONDITION.TRUE;
            } else {
                let isCondition = condition.isFunction ?
                    !!(<any>handler)[condition.conditionName]() :
                    !!(<any>handler)[condition.conditionName];
                if (condition.isInversion) isCondition = !isCondition;
                conditionData = isCondition ? CONDITION.TRUE : CONDITION.FALSE;
            }

            if (conditionData === condition.oldCondition) continue;
            condition.oldCondition = conditionData;

            if (condition.secondClassName) {
                if (conditionData === CONDITION.TRUE) {
                    element.classList.add(condition.firstClassName);
                    element.classList.remove(condition.secondClassName);
                } else {
                    element.classList.add(condition.secondClassName);
                    element.classList.remove(condition.firstClassName);
                }
                continue;
            }

            if (!condition.isConditionDisabled) {
                if (conditionData === CONDITION.TRUE) {
                    element.classList.add(condition.firstClassName);
                } else {
                    element.classList.remove(condition.firstClassName);
                }
                continue;
            }

            element.classList.add(condition.firstClassName);
        }
    }
}
