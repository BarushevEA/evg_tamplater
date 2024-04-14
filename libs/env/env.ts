import {AppWindow} from "./browserVariables";
import {E_DATA_MARKER} from "../enums/E_DATA_MARKER";

import {IAppElement} from "./types";

const mobileTestExp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile/i;
export const isMobile = isMobileDevice();
export const isIframe = AppWindow.top !== AppWindow;
export const AppChanelName = "AppChanelName_$$$_qaswedsaqwkfnv_129038777810456";
export const APP_RANDOM_STR = "APP_$$$_dfohirglkbjwefoi" + Date.now();

export const clsSeparator = ":";
export const E_DATA_MARKER_KEYS = Object.keys(E_DATA_MARKER);
export const ifDoubleInitVar = "_______$$bool";
export const emptyArr: IAppElement[] = <any>[0];
export const txtValBuffer: HTMLElement[] = [];
export const txtValBufferLength = 100;

function isMobileDevice(): boolean {
    const userAgentData = (<any>navigator).userAgentData;
    if (userAgentData && userAgentData.mobile) return true;
    if (userAgentData && mobileTestExp.test(userAgentData.platform)) return true;
    if (mobileTestExp.test(navigator.userAgent) || mobileTestExp.test(navigator.platform)) return true;

    const match = AppWindow.matchMedia;
    if (match) {
        const queryList = match("(pointer:coarse)");
        return queryList.matches;
    }
    return false;

}
