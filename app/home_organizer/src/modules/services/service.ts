import {Observable} from "evg_observable/src/outLib/Observable";
import {MenuEvent} from "../env/types";

export const menuService$ = new Observable<MenuEvent>(
    {
        isShow: false,
    });
