import {E_MENU_ACTION, E_MENU_OWNER, E_SETTINGS} from "../../env/enums";
import {menuService$} from "../observables";
import {MenuEvent} from "../../env/types";

export function IsMenuFree(event: MenuEvent, owner: E_MENU_OWNER): boolean {
    if(event.menuAction !== E_MENU_ACTION.SHOW) return true;
    if (event.owner === E_MENU_OWNER.NULL) return true;
    return event.owner === owner;
}

export function closeMenu() {
    const event = menuService$.getValue();
    if (!event.isShow) return;

    event.isShow = false;
    event.owner = E_MENU_OWNER.NULL;
    event.menuAction = E_MENU_ACTION.SHOW;

    menuService$.next(event);
}

export function openMenu(owner: E_MENU_OWNER): boolean {
    const event = menuService$.getValue();
    if (!IsMenuFree(event, owner)) return false;

    event.isShow = true;
    event.owner = owner;
    event.menuAction = E_MENU_ACTION.SHOW;

    menuService$.next(event);

    return true;
}

export function clickMenuItem(owner: E_MENU_OWNER, itemName: string): void {
    console.log("============> Menu_item click:", owner, itemName);
    if (owner === E_MENU_OWNER.SETTINGS && itemName === E_SETTINGS.LANGUAGE) return;
    closeMenu();

    const event = menuService$.getValue();
    event.item = itemName;
    event.owner = owner;
    event.menuAction = E_MENU_ACTION.ITEM_CLICK;

    menuService$.next(event);
}
