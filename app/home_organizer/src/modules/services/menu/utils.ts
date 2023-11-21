import {E_MENU_OWNER} from "../../env/enums";
import {menuService$} from "../observables";
import {MenuEvent} from "../../env/types";

export function IsMenuFree(event: MenuEvent, owner: E_MENU_OWNER): boolean {
    if (event.owner === E_MENU_OWNER.NULL) return true;
    return event.owner === owner;
}

export function closeMenu() {
    const event = menuService$.getValue();
    if (!event.isShow) return;

    event.isShow = false;
    event.owner = E_MENU_OWNER.NULL;

    menuService$.next(event);
}

export function openMenu(owner: E_MENU_OWNER): boolean {
    const event = menuService$.getValue();
    if (!IsMenuFree(event, owner)) return false;

    event.isShow = true;
    event.owner = owner;

    menuService$.next(event);

    return true;
}
