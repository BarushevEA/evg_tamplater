import {AppTxt, MenuEvent} from "./types";
import {E_ACCOUNT, E_CHOICE, E_MENU_OWNER, E_SETTINGS} from "./enums";
import {menuAccountTxt, menuChoiceTxt, menuSettingsTxt, menuTitleTxt} from "./Languages/menu";
import {LOCATION} from "../../../../../libs/elements/AppLocalization/location";

export const menuObject: MenuEvent = {
    isShow: false,
    owner: E_MENU_OWNER.NULL,
};

export const menuTitleLocale: AppTxt = {
    [E_MENU_OWNER.SETTINGS]: menuTitleTxt.settings,
    [E_MENU_OWNER.ACCOUNT]: menuTitleTxt.account,
    [E_MENU_OWNER.CHOICE]: menuTitleTxt.choice,
};

export const menuSettingsLocale: AppTxt = {
    [E_SETTINGS.LANGUAGE]: menuSettingsTxt.language,
    [E_SETTINGS.THEME]: menuSettingsTxt.theme,
    [E_SETTINGS.TIME_OPTION]: menuSettingsTxt.timeOption,
};

export const menuChoiceLocale: AppTxt = {
    [E_CHOICE.FAVORITE]: menuChoiceTxt.favorite,
    [E_CHOICE.FOOD]: menuChoiceTxt.food,
    [E_CHOICE.GOODS]: menuChoiceTxt.goods,
    [E_CHOICE.TASKS]: menuChoiceTxt.tasks,
};

export const menuAccountLocale: AppTxt = {
    [E_ACCOUNT.SIGN_IN]: menuAccountTxt.signIn,
    [E_ACCOUNT.SIGN_OUT]: menuAccountTxt.signOut,
    [E_ACCOUNT.REGISTER]: menuAccountTxt.register,
    [E_ACCOUNT.EDIT]: menuAccountTxt.edit,
    [E_ACCOUNT.DELETE]: menuAccountTxt.delete,
};

export const LANG_LIST: string[] = [LOCATION.EN, LOCATION.UA, LOCATION.RU];
