import {AppWindow} from "./browserVariables";
import {IAppElement} from "./types";
import {getStrongCrypto} from "../utils/idGenerator";

export const isIframe = AppWindow.top !== AppWindow;
export const APP_RANDOM_STR = `${getStrongCrypto()}`;
export const clsSeparator = ":";
export const ifDoubleInitVar = "_______$$bool";

export const emptyArr: IAppElement[] = <any>[0];
export const txtValBuffer: HTMLElement[] = [];
export const txtValBufferLength = 10000;
export const MAX_Z_INDEX = 2147483647;

