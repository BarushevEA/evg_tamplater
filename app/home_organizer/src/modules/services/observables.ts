import {Observable} from "evg_observable/src/outLib/Observable";
import {MenuEvent} from "../env/menuEnv/types";
import {menuObject} from "../env/menuEnv/variables";

export const menuService$ = new Observable<MenuEvent>(menuObject);
