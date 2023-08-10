import {AppWindow} from "./browserVariables";

const mobileTestExp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile/i;
export const isMobile = isMobileDevice();
export const isIframe = AppWindow.top !== AppWindow;

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
