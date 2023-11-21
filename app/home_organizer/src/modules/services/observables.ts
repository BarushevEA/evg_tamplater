import {Observable} from "evg_observable/src/outLib/Observable";
import {MenuEvent} from "../env/types";
import {menuObject} from "../env/variables";

export const menuService$ = new Observable<MenuEvent>(menuObject);
