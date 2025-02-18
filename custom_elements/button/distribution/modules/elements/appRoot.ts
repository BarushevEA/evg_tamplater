import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../libs/env/types";
import {ButtonOptions, DEFAULT_BUTTON_OPTIONS} from "../env/types";
import {E_SUB_ROUTE, TYPE} from "../../settings/subRoutesEnums";
import {buttonService$} from "../services/service";
import {SUB_ROUTE} from "../../../../../libs/elements/rootElements/appSubRout";

export class AppRoot implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    currentPage: TYPE;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onMessage(message: ButtonOptions<TYPE>): void {
        buttonService$.next(message);
    }

    onCreate(): void {
        this.currentPage = buttonService$.getValue().type;

        buttonService$
            .addFilter()
            .pushFilters([
                (buttonOption: ButtonOptions<TYPE>) => !!buttonOption,
                (buttonOption: ButtonOptions<TYPE>) => !!buttonOption.type,
                (buttonOption: ButtonOptions<TYPE>) => !!buttonOption.actionCallback,
                (buttonOption: ButtonOptions<TYPE>) => {
                    return buttonOption.type === TYPE.BUTTON || buttonOption.type === TYPE.IMAGE
                },
            ]);

        this.root.collect(
            buttonService$
                .pipe()
                .refine(buttonOption => buttonOption.type !== this.currentPage)
                .subscribe(buttonOption => {
                    SUB_ROUTE(E_SUB_ROUTE.VIEW).SHOW_PAGE(buttonOption.type);
                    this.currentPage = buttonOption.type;
                })
        );
    }

    onInit(): void {
        buttonService$.next(DEFAULT_BUTTON_OPTIONS);
    }

    onDestroy(): void {
    }
}
