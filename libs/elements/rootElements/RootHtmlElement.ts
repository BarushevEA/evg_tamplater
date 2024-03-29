import {IObservablePipe, ISubscriber, ISubscriptionLike} from "evg_observable/src/outLib/Types";
import {Observable} from "evg_observable/src/outLib/Observable";
import {E_DATA_MARKER, E_ROOT_TAG, getAttr, getAttrName, removeAttr, setAttr} from "../utils";
import {Collector} from "evg_observable/src/outLib/Collector";
import {addClasses, appendChild, createElement, removeChild, removeClasses} from "../../utils/utils";
import {quickDeleteFromArray} from "evg_observable/src/outLib/FunctionLibs";
import {
    AttributeChanged,
    ClassCondition,
    ClassIf,
    ELEMENT_OPTIONS,
    ForOf,
    IAppElement,
    IChanel,
    NestedValue,
    OnIf,
    RootElement,
    ValDetails
} from "../types";
import {clsSeparator} from "../env";
import {CONDITION} from "../../enums/CONDITION";
import {APP_RANDOM_STR} from "../../env/env";

const ifDoubleInitVar = "_______$$bool";

export function getCustomElement(options: ELEMENT_OPTIONS): CustomElementConstructor {
    class RootHtmlElement extends HTMLElement implements RootElement {
        static ahe_Counter = 0;
        ahe_number = 0;
        private ahe_opts: ELEMENT_OPTIONS;

        ahe_nValues: NestedValue[];
        ahe_nFunctions: NestedValue[];
        ahe_bindValues: NestedValue[];
        ahe_bindFunctions: NestedValue[];

        ahe_IfList: OnIf[];
        ahe_ClsIfList: ClassIf[];
        ahe_ForOfList: ForOf[];
        ahe_clr: Collector;
        ahe_component: any;
        ahe_parent_chanel: IChanel;

        onAdopted$: Observable<boolean>;
        onInit$: Observable<boolean>;
        onDestroy$: Observable<boolean>;
        attributeChanged$: Observable<AttributeChanged | undefined>;
        beforeDetectChanges$: Observable<boolean>;
        onChangesDetected$: Observable<boolean>;
        onDataCatch$: Observable<any>;
        onParentChanelReady$: Observable<IChanel>;

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
            this.onDataCatch$ = new Observable(undefined);
            this.onParentChanelReady$ = new Observable(undefined);
            this.ahe_clr = new Collector();
            this.ahe_nFunctions = [];
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

        parentChanelReady$(): ISubscriber<IChanel> & IObservablePipe<IChanel> {
            return this.onParentChanelReady$;
        }

        adopted$(): ISubscriber<boolean> & IObservablePipe<boolean> {
            return this.onAdopted$;
        }

        init$(): ISubscriber<boolean> & IObservablePipe<boolean> {
            return this.onInit$;
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

        dataCatch$<T>(): ISubscriber<T> & IObservablePipe<T> {
            return <any>this.onDataCatch$;
        }

        connectedCallback() {
            if (getAttr(this, E_DATA_MARKER.ON_IF)) {
                if (!this.ahe_component[ifDoubleInitVar]) return;
            }

            if (this.ahe_opts.template) this.innerHTML = this.ahe_opts.template;
            if (this.tagName.toLowerCase() === E_ROOT_TAG.TEXT_VALUE) return;
            if (this.tagName.toLowerCase() === E_ROOT_TAG.QSI_BIND) return;

            detectInjectedData(this);
            this.detectChanges(true);

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
            if (this.tagName.toLowerCase() === E_ROOT_TAG.QSI_BIND) return;

            this.onDestroy$.next(true);
            if (this.ahe_component.onDestroy) this.ahe_component.onDestroy();

            this.ahe_clr.unsubscribeAll();
            this.ahe_nFunctions.length = 0;
            this.ahe_nValues.length = 0;
            this.ahe_bindFunctions.length = 0;
            this.ahe_bindValues.length = 0;
            this.ahe_IfList.length = 0;
            this.ahe_ClsIfList.length = 0;
            this.ahe_ForOfList.length = 0;
            this.innerHTML = "";
            this.onAdopted$.unsubscribeAll();
            this.onInit$.unsubscribeAll();
            this.onDestroy$.unsubscribeAll();
            this.attributeChanged$.unsubscribeAll();
            this.beforeDetectChanges$.unsubscribeAll();
            this.onChangesDetected$.unsubscribeAll();
            this.onDataCatch$.unsubscribeAll();
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
            changeBindFunctions(this);
            changeNestedValues(this);
            changeNestedFunctions(this);
            this.onChangesDetected$.next(true);
        }

        sendData<T>(data: T): void {
            this.onDataCatch$.next(data);
        }

        getChanel(element: any): IChanel | undefined {
            if (!element) return undefined;
            if ((<IAppElement>element).isCustomAppElement) return <IChanel>element;
            if (!(<RootElement>element).ahe_component) return undefined;
            if (!(<IChanel>element).sendData) return undefined;

            element.isCustomAppElement = true;

            return <IChanel>element;
        }

        transferToChanel<T, V>(chanelCb: () => IChanel, dataCb: (data: T) => V): void {
            this.dataCatch$<T>()
                .pipe()
                .emitByPositive(() => chanelCb())
                .subscribe((data: T) => {
                    chanelCb().sendData<V>(
                        dataCb(data)
                    )
                })
        }

        sendToChanel<T>(chanel: IChanel, data: T): void {
            chanel && chanel.sendData<T>(data);
        }

        isAppElement(element: any): boolean {
            return !!this.getChanel(element);
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

function detectInjectedData(rootElement: RootElement): void {
    const children = getFreeChildren(rootElement);
    for (let i = 0; i < children.length; i++) {
        handleInjections(rootElement, detectForCycle(rootElement, children[i]));
    }
}

function handleInjections(rootElement: RootElement, children: IAppElement[]) {
    if (!children.length) return;

    let actions = "[";

    if (children.length > 1) {
        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            actions += detectIfConditions(rootElement, <HTMLElement>child);
            setAttr(child, E_DATA_MARKER.INFO, actions.trim() + "]");

            (<RootElement><any>child).ahe_parent_chanel = <IChanel><any>rootElement;
            (<any>child).onParentChanelReady$.next(<IChanel><any>rootElement);
        }
        return;
    }

    const child = children[0];

    if (detectVariables(rootElement, child)) {
        setAttr(child, E_DATA_MARKER.INFO, actions + "var]");
        return;
    }

    if (detectBindVariables(rootElement, child)) {
        setAttr(child, E_DATA_MARKER.INFO, actions + "bind]");
        return;
    }

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
    setAttr(child, E_DATA_MARKER.INFO, actions.trim() + "]");

    if (child.isCustomAppElement) {
        (<RootElement><any>child).ahe_parent_chanel = <IChanel><any>rootElement;
        (<any>child).onParentChanelReady$.next(<IChanel><any>rootElement);
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

    for (let i = 0; i < strConditions.length; i++) {
        const strCondition = strConditions[i];

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

    const ifParent = createElement(E_ROOT_TAG.TEXT_VALUE);
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

    setAttr(ifParent, E_DATA_MARKER.INFO, "[ifp]");

    return "ifc ";
}

const emptyArr: IAppElement[] = <any>[0];

function detectForCycle(rootElement: RootElement, element: IAppElement): IAppElement[] {
    if (element.tagName.toLowerCase() === E_ROOT_TAG.TEXT_VALUE) return (emptyArr[0] = element) && emptyArr;
    if (element.tagName.toLowerCase() === E_ROOT_TAG.QSI_BIND) return (emptyArr[0] = element) && emptyArr;
    if (!rootElement.isAppElement(element)) return (emptyArr[0] = element) && emptyArr;

    const arrName = getAttr(element, E_DATA_MARKER.FOR);
    if (!arrName) return (emptyArr[0] = element) && emptyArr;

    const arr = rootElement.ahe_component[arrName];
    if (!arr) return (emptyArr[0] = element) && emptyArr;

    const cycleParent = createElement(E_ROOT_TAG.TEXT_VALUE);
    const htmlParent = element.parentElement;

    const newElements = updateForOfChildren(
        rootElement,
        [],
        arr,
        cycleParent,
        element);

    setAttr(cycleParent, E_DATA_MARKER.INFO, `[for-of]`);
    htmlParent.insertBefore(cycleParent, element);
    removeChild(htmlParent, element);
    removeAttr(element, E_DATA_MARKER.FOR);

    rootElement.ahe_ForOfList.push({
        parent: cycleParent,
        template: element,
        children: newElements,
        valueName: arrName,
    });

    return newElements;
}

function handleCirclesChannelData(data: any, element: HTMLElement, root: RootElement) {
    root.isAppElement(element) && (<IChanel><any>element).sendData(data);
}

function updateForOfChildren(
    rootElement: RootElement,
    childrenForUpdate: HTMLElement[],
    injectedArr: [],
    cycleParent: HTMLElement,
    template: HTMLElement): IAppElement[] {
    const newChildren: IAppElement[] = [];
    const lenOldChildren = childrenForUpdate.length;
    const lenInjectedArr = injectedArr.length;
    let delta = lenInjectedArr - lenOldChildren;

    if (!(lenInjectedArr + lenOldChildren)) return newChildren;

    if (delta > 0) {
        for (let i = 0; i < delta; i++) {
            const newElement = <IAppElement><any>createElement(template.tagName);
            childrenForUpdate.push(newElement);
            newChildren.push(newElement);

            const value = getAttr(template, E_DATA_MARKER.ON_IF);
            value && setAttr(newElement, E_DATA_MARKER.ON_IF, value);
            appendChild(cycleParent, newElement);

            handleCirclesChannelData(injectedArr[lenInjectedArr - delta + i], newElement, rootElement);
        }

        for (let i = 0; i < lenInjectedArr - delta; i++) {
            handleCirclesChannelData(injectedArr[i], childrenForUpdate[i], rootElement);
        }
    } else {
        delta *= -1;
        for (let i = 0; i < delta; i++) {
            const child = childrenForUpdate.pop();
            const ifList = rootElement.ahe_IfList;
            let ifComponent: OnIf;

            for (let j = 0; j < ifList.length; j++) {
                const onIf = ifList[j];

                if (onIf.ifElement === child) {
                    ifComponent = onIf;
                    break;
                }
            }

            if (ifComponent) {
                quickDeleteFromArray(ifList, ifComponent);
                removeChild(cycleParent, ifComponent.ifParent);
            } else {
                removeChild(cycleParent, child);
            }
        }

        for (let i = 0; i < lenInjectedArr; i++) {
            handleCirclesChannelData(injectedArr[i], childrenForUpdate[i], rootElement);
        }
    }

    return newChildren;
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

function getFreeChildren(parent: HTMLElement): IAppElement[] {
    return <IAppElement[]><any>(parent.querySelectorAll(`*:not([${getAttrName(E_DATA_MARKER.INFO)}])`));
}

function detectVariables(rootElement: RootElement, element: Element): boolean {
    if (element.tagName.toLowerCase() === E_ROOT_TAG.TEXT_VALUE) {
        if (!element.innerHTML) return false;

        const details = getDetails(rootElement, element.innerHTML);

        if (details.isFunction) {
            rootElement.ahe_nFunctions.push({
                textElement: <HTMLElement>element,
                valueName: details.valueName,
                lastData: APP_RANDOM_STR
            });
            return true;
        }

        rootElement.ahe_nValues.push({
            textElement: <HTMLElement>element,
            valueName: details.valueName,
            lastData: APP_RANDOM_STR
        });
        return true;
    }
    return false;
}

function detectBindVariables(rootElement: RootElement, element: Element): boolean {
    if (element.tagName.toLowerCase() === E_ROOT_TAG.QSI_BIND) {
        if (!element.innerHTML) return false;

        const details = getDetails(rootElement, element.innerHTML);

        if (details.isFunction) {
            rootElement.ahe_bindFunctions.push({
                textElement: <HTMLElement>element,
                valueName: details.valueName,
                lastData: APP_RANDOM_STR
            });
            return true;
        }

        rootElement.ahe_bindValues.push({
            textElement: <HTMLElement>element,
            valueName: details.valueName,
            lastData: APP_RANDOM_STR
        });
        return true;
    }
    return false;
}

function execute(rootElement: RootElement, functionName: string, evt: MouseEvent | KeyboardEvent | Event) {
    rootElement.ahe_component[functionName](evt);
}

function detectInjections(rootElement: RootElement, element: HTMLElement): string {
    const injectionName = getInjectionName(element, E_DATA_MARKER.INJECT_TO);
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

    bindElementToMethod(rootElement, functionName, element);
    removeAttr(element, marker);

    return functionName;
}

function getInjectionName(element: HTMLElement, marker: E_DATA_MARKER): string {
    const injectionName = getAttr(element, marker);
    if (!injectionName) return "";

    removeAttr(element, marker);

    return injectionName;
}

function detectElementHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getAttr(element, E_DATA_MARKER.ON_HANDLE);
    if (!functionName) return "";

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
        rootElement.destroy$().subscribe(isDestroy => isDestroy && (method.htmlElements = {}))
    );

    method.htmlElements[rootElement.ahe_number].push(element);
}

function changeNestedValues(rootElement: RootElement): void {
    for (let i = 0; i < rootElement.ahe_nValues.length; i++) {
        const nestedValue = rootElement.ahe_nValues[i];
        const nestedData = rootElement.ahe_component[nestedValue.valueName];

        if (nestedValue.lastData === nestedData) continue;

        nestedValue.textElement.innerHTML = nestedData;
        nestedValue.lastData = nestedData;
    }
}

function changeBindValues(rootElement: RootElement): void {
    for (let i = 0; i < rootElement.ahe_bindValues.length; i++) {
        const nestedValue = rootElement.ahe_bindValues[i];
        const nestedData = rootElement.ahe_component[nestedValue.valueName];

        if (nestedValue.lastData === nestedData) continue;

        nestedValue.textElement.textContent = nestedData;
        nestedValue.lastData = nestedData;
    }
}

function changeNestedFunctions(rootElement: RootElement): void {
    for (let i = 0; i < rootElement.ahe_nFunctions.length; i++) {
        const nestedValue = rootElement.ahe_nFunctions[i];
        const nestedData = rootElement.ahe_component[nestedValue.valueName]();

        if (nestedValue.lastData === nestedData) continue;

        nestedValue.textElement.innerHTML = nestedData;
        nestedValue.lastData = nestedData;
    }
}

function changeBindFunctions(rootElement: RootElement): void {
    for (let i = 0; i < rootElement.ahe_bindFunctions.length; i++) {
        const nestedValue = rootElement.ahe_bindFunctions[i];
        const nestedData = rootElement.ahe_component[nestedValue.valueName]();

        if (nestedValue.lastData === nestedData) continue;

        nestedValue.textElement.textContent = nestedData;
        nestedValue.lastData = nestedData;
    }
}

function changeIfConditions(rootElement: RootElement) {
    for (let i = 0; i < rootElement.ahe_IfList.length; i++) {
        const onIf = rootElement.ahe_IfList[i];
        let conditionData = onIf.isFunction ?
            !!(<any>rootElement.ahe_component)[onIf.valueName]() :
            !!(<any>rootElement.ahe_component)[onIf.valueName];
        if (onIf.isInversion) conditionData = !conditionData;

        if (conditionData === onIf.oldCondition) continue;
        onIf.oldCondition = conditionData;

        const isContains = onIf.ifParent.contains(onIf.ifElement);

        if (conditionData) {
            if (!isContains) appendChild(onIf.ifParent, onIf.ifElement);
        } else {
            if (isContains) removeChild(onIf.ifParent, onIf.ifElement);
        }
    }
}

function changeClsConditions(rootElement: RootElement) {
    for (let i = 0; i < rootElement.ahe_ClsIfList.length; i++) {
        const classIf = rootElement.ahe_ClsIfList[i];
        const conditions = classIf.classConditions;
        const element = classIf.element;
        const handler = rootElement.ahe_component;

        for (let j = 0; j < conditions.length; j++) {
            const condition = conditions[j];
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
            const firstClassName = condition.firstClassName;
            const secondClassName = condition.secondClassName;

            if (secondClassName) {
                if (conditionData === CONDITION.TRUE) {
                    addClasses(element, [firstClassName]);
                    removeClasses(element, [secondClassName]);
                } else {
                    addClasses(element, [secondClassName]);
                    removeClasses(element, [firstClassName]);
                }
                continue;
            }

            if (!condition.isConditionDisabled) {
                if (conditionData === CONDITION.TRUE) {
                    addClasses(element, [firstClassName]);
                } else {
                    removeClasses(element, [firstClassName]);
                }
                continue;
            }
            addClasses(element, [firstClassName]);
        }
    }
}

function changeForOf(rootElement: RootElement) {
    const list = rootElement.ahe_ForOfList;

    for (let i = 0; i < list.length; i++) {
        const forOf = list[i];
        const elements = updateForOfChildren(
            rootElement,
            forOf.children,
            rootElement.ahe_component[forOf.valueName],
            forOf.parent,
            forOf.template);
        handleInjections(rootElement, elements);
    }
}
