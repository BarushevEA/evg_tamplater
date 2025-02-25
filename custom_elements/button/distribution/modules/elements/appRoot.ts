import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../libs/env/types";
import {ButtonOptions} from "../env/types";
import {TYPE} from "../../settings/subRoutesEnums";
import {buttonService$} from "../services/service";
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
        this.currentPage = buttonService$.getValue().type;
    }

    onCreate(): void {
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
    }

    onInit(): void {
        (this.root.shadowRoot as any)["shadowId"] = this.id;
    }

    onDestroy(): void {
    }
}
