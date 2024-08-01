import {AppWindow} from "../env/browserVariables";

export const isMobile = isMobileDevice();
const mobileTestExp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile/i;

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
