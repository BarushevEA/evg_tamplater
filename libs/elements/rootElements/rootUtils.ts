import {addClasses, appendChild, createElement, removeChild, removeClasses} from "../../utils/utils";
import {quickDeleteFromArray} from "evg_observable/src/outLib/FunctionLibs";
import {APP_RANDOM_STR, clsSeparator, emptyArr, txtValBuffer, txtValBufferLength} from "../../env/env";
import {CONDITION} from "../../enums/CONDITION";
import {E_DATA_MARKER} from "../../enums/E_DATA_MARKER";
import {E_ROOT_TAG} from "../../enums/E_ROOT_TAG";
import {ClassCondition, ClassIf, IAppElement, IChannel, OnIf, RootElement, ValDetails} from "../../env/types";

export function getAttrName(marker: E_DATA_MARKER): string {
    return `qsi-${marker}`;
}

export function getAttr(element: HTMLElement | Element, marker: E_DATA_MARKER): string {
    if (!element) return "";
    return element.getAttribute(getAttrName(marker))
}

export function getAttrNative(element: HTMLElement | Element, marker: string): string {
    if (!element) return "";
    return element.getAttribute(marker)
}

export function setAttr(element: HTMLElement | Element, marker: E_DATA_MARKER, value: string) {
    if (!element) return;
    element.setAttribute(getAttrName(marker), value);
}

export function removeAttr(element: HTMLElement | Element, marker: E_DATA_MARKER): void {
    if (!element) return;
    element.removeAttribute(getAttrName(marker))
}

export function detectInjectedData(rootElement: RootElement): void {
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

            (<RootElement><any>child).ahe_pnt_chl = <IChannel><any>rootElement;
            (<any>child).ahe_onPChlRdy$.next(<IChannel><any>rootElement);
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
    actions += detectChannel(rootElement, <HTMLElement>child);
    actions += detectSource(rootElement, <HTMLElement>child);
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
        (<RootElement><any>child).ahe_pnt_chl = <IChannel><any>rootElement;
        (<any>child).ahe_onPChlRdy$.next(<IChannel><any>rootElement);
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

    rootElement.ahe_ClsIfLst.push(clsIf);
    removeAttr(element, E_DATA_MARKER.CLASS_IF);

    return "cls ";
}

function detectIfConditions(rootElement: RootElement, element: HTMLElement): string {
    let valueName = getAttr(element, E_DATA_MARKER.ON_IF);
    if (!valueName) return "";

    const ifParent = getTxtValue();
    const htmlParent = element.parentElement;

    const details = getDetails(rootElement, valueName);

    rootElement.ahe_IfLst.push({
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

function createTxtValBuffer() {
    for (let i = 0; i < txtValBufferLength; i++) {
        txtValBuffer.push(createElement(E_ROOT_TAG.TEXT_VALUE));
    }
}

createTxtValBuffer();

function getTxtValue(): HTMLElement {
    if (txtValBuffer.length) return txtValBuffer.pop();
    return createElement(E_ROOT_TAG.TEXT_VALUE);
}

function detectForCycle(rootElement: RootElement, element: IAppElement): IAppElement[] {
    if (element.tagName === E_ROOT_TAG.TEXT_VALUE) return (emptyArr[0] = element) && emptyArr;
    if (element.tagName === E_ROOT_TAG.QSI_BIND) return (emptyArr[0] = element) && emptyArr;
    if (!rootElement.isAppElement(element)) return (emptyArr[0] = element) && emptyArr;

    const arrName = getAttr(element, E_DATA_MARKER.FOR);
    if (!arrName) return (emptyArr[0] = element) && emptyArr;

    const arr = rootElement.ahe_cmt[arrName];
    if (!arr) return (emptyArr[0] = element) && emptyArr;

    const cycleParent = getTxtValue();
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

    rootElement.ahe_ForOfLst.push({
        parent: cycleParent,
        template: element,
        children: newElements,
        valueName: arrName,
    });

    return newElements;
}

function handleCirclesChannelData(data: any, element: HTMLElement, root: RootElement) {
    root.isAppElement(element) && (<IChannel><any>element).sendMessage(data);
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
            const ifList = rootElement.ahe_IfLst;
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
        isFunction: typeof rootElement.ahe_cmt[name] === "function"
    }
}

function getFreeChildren(parent: HTMLElement): IAppElement[] {
    return <IAppElement[]><any>(parent.querySelectorAll(`*:not([${getAttrName(E_DATA_MARKER.INFO)}])`));
}

function detectVariables(rootElement: RootElement, element: Element): boolean {
    if (element.tagName !== E_ROOT_TAG.TEXT_VALUE) return false;
    if (!element.innerHTML) return false;

    const details = getDetails(rootElement, element.innerHTML);

    if (details.isFunction) {
        rootElement.ahe_nFns.push({
            textElement: <HTMLElement>element,
            valueName: details.valueName,
            lastData: APP_RANDOM_STR
        });
        return true;
    }

    rootElement.ahe_nVls.push({
        textElement: <HTMLElement>element,
        valueName: details.valueName,
        lastData: APP_RANDOM_STR
    });
    return true;
}

function detectBindVariables(rootElement: RootElement, element: Element): boolean {
    if (element.tagName !== E_ROOT_TAG.QSI_BIND) return false;
    if (!element.innerHTML) return false;

    const details = getDetails(rootElement, element.innerHTML);

    if (details.isFunction) {
        rootElement.ahe_bndFns.push({
            textElement: <HTMLElement>element,
            valueName: details.valueName,
            lastData: APP_RANDOM_STR
        });
        return true;
    }

    rootElement.ahe_bndVls.push({
        textElement: <HTMLElement>element,
        valueName: details.valueName,
        lastData: APP_RANDOM_STR
    });
    return true;
}

function execute(rootElement: RootElement, functionName: string, evt: MouseEvent | KeyboardEvent | Event) {
    rootElement.ahe_cmt[functionName](evt);
}

function detectSource(rootElement: RootElement, element: HTMLElement): string {
    const fieldName = getFieldName(element, E_DATA_MARKER.SOURCE);
    if (!fieldName) return "";
    const details = getDetails(rootElement, fieldName);

    if (details.isFunction) {
        rootElement.ahe_srcCmsFns.push({
            textElement: <HTMLElement>element,
            valueName: details.valueName,
            lastData: "",
        });
        return "src ";
    }

    rootElement.ahe_srcCms.push(
        {
            textElement: <HTMLElement>element,
            valueName: fieldName,
            lastData: ""
        }
    );

    return "src ";
}

function detectInjections(rootElement: RootElement, element: HTMLElement): string {
    const injectionName = getFieldName(element, E_DATA_MARKER.INJECT_TO);
    if (!injectionName) return "";
    rootElement.ahe_cmt[injectionName] = element;
    return "inj ";
}

function detectChannel(rootElement: RootElement, element: HTMLElement): string {
    const channelName = getFieldName(element, E_DATA_MARKER.CHANNEL);
    if (!channelName) return "";
    if (!(<IAppElement>element).isCustomAppElement) return "";

    rootElement.ahe_cmt[channelName] = <IChannel><any>element;
    return "cnl ";
}

function detectClickHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_CLICK);
    if (!functionName) return "";
    element.onclick = (evt) => execute(rootElement, functionName, evt);
    return "clk ";
}

function detectMouseLeaveHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_MOUSE_LEAVE);
    if (!functionName) return "";
    element.onmouseleave = (evt) => execute(rootElement, functionName, evt);
    return "mlv ";
}

function detectMouseEnterHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_MOUSE_ENTER);
    if (!functionName) return "";
    element.onmouseenter = (evt) => execute(rootElement, functionName, evt);
    return "mer ";
}

function detectMouseUpHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_MOUSE_UP);
    if (!functionName) return "";
    element.onmouseup = (evt) => execute(rootElement, functionName, evt);
    return "mup ";
}

function detectMouseDownHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_MOUSE_DOWN);
    if (!functionName) return "";
    element.onmousedown = (evt) => execute(rootElement, functionName, evt);
    return "mdn ";
}

function detectMouseMoveHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_MOUSE_MOVE);
    if (!functionName) return "";
    element.onmousemove = (evt) => execute(rootElement, functionName, evt);
    return "mmv ";
}

function detectKeyDownHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_KEY_DOWN);
    if (!functionName) return "";
    element.onkeydown = (evt) => execute(rootElement, functionName, evt);
    return "kdn ";
}

function detectKeyUpHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_KEY_UP);
    if (!functionName) return "";
    element.onkeyup = (evt) => execute(rootElement, functionName, evt);
    return "kup ";
}

function detectDblClickHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_KEY_DBL_CLICK);
    if (!functionName) return "";
    element.ondblclick = (evt) => execute(rootElement, functionName, evt);
    return "dbc ";
}

function detectScrollHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_SCROLL);
    if (!functionName) return "";
    element.onscroll = (evt) => execute(rootElement, functionName, evt);
    return "scl ";
}

function detectWheelHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_WHEEL);
    if (!functionName) return "";
    element.onwheel = (evt) => execute(rootElement, functionName, evt);
    return "whl ";
}

function detectChangeHandlers(rootElement: RootElement, element: HTMLElement): string {
    const functionName = getFunctionName(rootElement, element, E_DATA_MARKER.ON_CHANGE);
    if (!functionName) return "";
    element.onchange = (evt) => execute(rootElement, functionName, evt);
    return "chg ";
}

function getFunctionName(rootElement: RootElement, element: HTMLElement, marker: E_DATA_MARKER): string {
    const functionName = getAttr(element, marker);
    if (!functionName) return "";

    bindElementToMethod(rootElement, functionName, element);
    removeAttr(element, marker);

    return functionName;
}

function getFieldName(element: HTMLElement, marker: E_DATA_MARKER): string {
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
    const method = rootElement.ahe_cmt[functionName];

    if (!method) return;
    if (!method.htmlElements) method.htmlElements = {};
    if (!method.htmlElements[rootElement.ahe_nmr]) method.htmlElements[rootElement.ahe_nmr] = [];

    rootElement.ahe_clr.collect(
        rootElement.beforeDestroy$().subscribe(isDestroy => isDestroy && (method.htmlElements = {}))
    );

    method.htmlElements[rootElement.ahe_nmr].push(element);
}

export function changeNestedValues(rootElement: RootElement): void {
    const handler = rootElement.ahe_cmt;

    for (let i = 0; i < rootElement.ahe_nVls.length; i++) {
        const nestedValue = rootElement.ahe_nVls[i];
        const nestedData = handler[nestedValue.valueName];

        if (nestedValue.lastData === nestedData) continue;

        nestedValue.textElement.innerHTML = nestedData;
        nestedValue.lastData = nestedData;
    }
}

export function changeBindValues(rootElement: RootElement): void {
    const handler = rootElement.ahe_cmt;

    for (let i = 0; i < rootElement.ahe_bndVls.length; i++) {
        const nestedValue = rootElement.ahe_bndVls[i];
        const nestedData = handler[nestedValue.valueName];

        if (nestedValue.lastData === nestedData) continue;

        nestedValue.textElement.textContent = nestedData;
        nestedValue.lastData = nestedData;
    }
}

export function changeSource(rootElement: RootElement): void {
    const handler = rootElement.ahe_cmt;

    for (let i = 0; i < rootElement.ahe_srcCms.length; i++) {
        const nestedValue = rootElement.ahe_srcCms[i];
        const nestedData = handler[nestedValue.valueName];
        const value = nestedData ?? "";

        if (nestedValue.lastData === value) continue;

        (<any>nestedValue.textElement).src = value;
        nestedValue.lastData = value;
    }
}

export function changeSourceFunctions(rootElement: RootElement): void {
    const handler = rootElement.ahe_cmt;

    for (let i = 0; i < rootElement.ahe_srcCmsFns.length; i++) {
        const nestedValue = rootElement.ahe_srcCmsFns[i];
        const nestedData = handler[nestedValue.valueName]();
        const value = nestedData ?? "";

        if (nestedValue.lastData === value) continue;

        (<any>nestedValue.textElement).src = value;
        nestedValue.lastData = value;
    }
}

export function changeNestedFunctions(rootElement: RootElement): void {
    const handler = rootElement.ahe_cmt;

    for (let i = 0; i < rootElement.ahe_nFns.length; i++) {
        const nestedValue = rootElement.ahe_nFns[i];
        const nestedData = handler[nestedValue.valueName]();

        if (nestedValue.lastData === nestedData) continue;

        nestedValue.textElement.innerHTML = nestedData;
        nestedValue.lastData = nestedData;
    }
}

export function changeBindFunctions(rootElement: RootElement): void {
    const handler = rootElement.ahe_cmt;

    for (let i = 0; i < rootElement.ahe_bndFns.length; i++) {
        const nestedValue = rootElement.ahe_bndFns[i];
        const nestedData = handler[nestedValue.valueName]();

        if (nestedValue.lastData === nestedData) continue;

        nestedValue.textElement.textContent = nestedData;
        nestedValue.lastData = nestedData;
    }
}

export function changeIfConditions(rootElement: RootElement) {
    const handler = rootElement.ahe_cmt;

    for (let i = 0; i < rootElement.ahe_IfLst.length; i++) {
        const onIf = rootElement.ahe_IfLst[i];
        let conditionData = onIf.isFunction ? !!handler[onIf.valueName]() : !!handler[onIf.valueName];
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

export function changeClsConditions(rootElement: RootElement) {
    const handler = rootElement.ahe_cmt;

    for (let i = 0; i < rootElement.ahe_ClsIfLst.length; i++) {
        const {classConditions, element} = rootElement.ahe_ClsIfLst[i];

        for (let j = 0; j < classConditions.length; j++) {
            const condition = classConditions[j];
            let conditionData: CONDITION;

            if (condition.isConditionDisabled) {
                conditionData = CONDITION.TRUE;
            } else {
                let isCondition = condition.isFunction ?
                    !!handler[condition.conditionName]() :
                    !!handler[condition.conditionName];

                if (condition.isInversion) isCondition = !isCondition;
                conditionData = isCondition ? CONDITION.TRUE : CONDITION.FALSE;
            }

            if (conditionData === condition.oldCondition) continue;
            condition.oldCondition = conditionData;
            const {firstClassName, secondClassName} = condition;

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

export function changeForOf(rootElement: RootElement) {
    const list = rootElement.ahe_ForOfLst;
    const handler = rootElement.ahe_cmt;

    for (let i = 0; i < list.length; i++) {
        const forOf = list[i];
        const elements = updateForOfChildren(
            rootElement,
            forOf.children,
            handler[forOf.valueName],
            forOf.parent,
            forOf.template);
        handleInjections(rootElement, elements);
    }
}

export function clearProperties(rootElement: RootElement & HTMLElement): void {
    rootElement.ahe_nFns.length = 0;
    rootElement.ahe_srcCmsFns.length = 0;
    rootElement.ahe_srcCms.length = 0;
    rootElement.ahe_nVls.length = 0;
    rootElement.ahe_bndFns.length = 0;
    rootElement.ahe_bndVls.length = 0;
    rootElement.ahe_IfLst.length = 0;
    rootElement.ahe_ClsIfLst.length = 0;
    rootElement.ahe_ForOfLst.length = 0;
    rootElement.innerHTML = "";
}
