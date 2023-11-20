import {MenuEvent} from "./types";
import {E_MENU_OWNER} from "./enums";
import {menuService$} from "../services/service";

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

export function formattedDate(num: number): string {
    let date = ""+num;
    if (date.length<2) date = "0" + date;

    return date
}
