import {E_MENU_OWNER} from "./enums";
import {ILocalizedText} from "../../../../../libs/elements/AppLocalization/types";

export type MenuEvent = {
    isShow: boolean;
    owner: E_MENU_OWNER;
};
export type MenuItem = {
    owner: E_MENU_OWNER;
    action: string;
    text: string;
}
export type AppTxt = {
    [key: string]: ILocalizedText;
};
export type MenuSettingsTxt = {
    language: ILocalizedText;
    theme: ILocalizedText;
    timeOption: ILocalizedText;
}
export type MenuChoiceTxt = {
    tasks: ILocalizedText;
    favorite: ILocalizedText;
    food: ILocalizedText;
    goods: ILocalizedText;
}
export type MenuAccountTxt = {
    signIn: ILocalizedText;
    register: ILocalizedText;
    edit: ILocalizedText;
    signOut: ILocalizedText;
    delete: ILocalizedText;
}
export type MenuTitleTxt = {
    choice: ILocalizedText;
    account: ILocalizedText;
    settings: ILocalizedText;
}
export type MenuList = MenuItem[];
