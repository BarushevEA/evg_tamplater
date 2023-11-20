import {Observable} from "evg_observable/src/outLib/Observable";
import {MenuEvent} from "../env/types";
import {E_MENU_OWNER} from "../env/enums";

const menuObject: MenuEvent = {
    isShow: false,
    owner: E_MENU_OWNER.NULL,
};

export const menuService$ = new Observable<MenuEvent>(menuObject);
