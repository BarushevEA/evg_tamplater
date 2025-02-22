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
                (buttonOption: ButtonOptions<TYPE>) => !!buttonOption.actionCallback,
                (buttonOption: ButtonOptions<TYPE>) => {
                    return buttonOption.type === TYPE.BUTTON || buttonOption.type === TYPE.IMAGE;
                },
            ]);

        this.root.collect(
            buttonService$
                .pipe()
                .refine(buttonOption => buttonOption.type !== this.currentPage)
                .subscribe(buttonOption => {
                    if (buttonOption.id !== this.id) {
                        return;
                    }
                    SUB_ROUTE(E_SUB_ROUTE.VIEW).SHOW_PAGE(buttonOption.type);
                    this.currentPage = buttonOption.type;
                })
        );
    }

    onInit(): void {
        // // @ts-ignore
        // this.root.shadowRoot["shadowId"] = generateId();
        // // @ts-ignore
        // log(this.name,"this.root.shadowRoot[\"shadowId\"]:", this.root.shadowRoot["shadowId"]);

        // this.root.id = this.id;

        const div = document.createElement("div");
        div.id = "shadowId";
        div.style.width = "0";
        div.style.height = "0";
        div.style.opacity = "0";
        div.innerText = this.id;
        this.root.shadowRoot.append(div);

        // log(this.name,"this.root.shadowRoot.innerHTML", this.root.shadowRoot.innerHTML);
        // buttonService$.next(DEFAULT_BUTTON_OPTIONS);
        // this.root.collect(
        //     buttonService$.subscribe(buttonOption => {
        //         buttonOption.id = this.id
        //     })
        // );
    }

    onDestroy(): void {
    }
}
