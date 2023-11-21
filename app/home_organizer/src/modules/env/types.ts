import {E_MENU_OWNER} from "./enums";
import {ILocalizedText} from "../../../../../libs/elements/AppLocalization/types";

export type MenuEvent = {
    isShow: boolean;
    owner: E_MENU_OWNER;
};

export type AppTxt = {
    [key: string]: ILocalizedText;
};

export type MenuList = string[];
