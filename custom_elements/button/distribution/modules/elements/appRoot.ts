import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../libs/env/types";
import {ButtonOptions} from "../env/types";
import {E_SUB_ROUTE, TYPE} from "../../settings/subRoutesEnums";
import {buttonService$} from "../services/service";
import {SUB_ROUTE} from "../../../../../libs/elements/rootElements/appSubRout";
import {generateId} from "../../../../../libs/utils/idGenerator";

export class AppRoot implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    currentPage: TYPE;
    id: string;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onMessage(message: ButtonOptions<TYPE>): void {
        message.id = this.id;
        buttonService$.next(message);
    }

    onCreate(): void {
        this.currentPage = buttonService$.getValue().type;
        this.id = generateId();

        buttonService$
            .addFilter()
            .pushFilters([
                (buttonOption: ButtonOptions<TYPE>) => !!buttonOption,
                (buttonOption: ButtonOptions<TYPE>) => !!buttonOption.type,
                (buttonOption: ButtonOptions<TYPE>) => !!buttonOption.state,
                (buttonOption: ButtonOptions<TYPE>) => {
                    return buttonOption.type === TYPE.BUTTON || buttonOption.type === TYPE.IMAGE;
                },
            ]);

        this.root.collect(
            buttonService$
                .pipe()
                .refine(buttonOption => buttonOption.type !== this.currentPage)
                .refine(buttonOption => buttonOption.id === this.id)
                .subscribe(buttonOption => {
                    SUB_ROUTE(E_SUB_ROUTE.VIEW).SHOW_PAGE(buttonOption.type);
                    this.currentPage = buttonOption.type;
                })
        );
    }

    onInit(): void {
        (this.root.shadowRoot as any)["shadowId"] = this.id;
    }

    onDestroy(): void {
    }
}
