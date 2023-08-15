import {Event$} from "evg_event_history/src/outLib/env";
import {customTemplate, E_SUBS_TEMPLATE} from "../../templates/templateMarkers";
import {NextMain$} from "../services/headerService";
import {History} from "evg_event_history/src/outLib/history";
import {RootElement} from "../../../../../libs/env/types";
import {getElement} from "../../../../../libs/elements/rootElements/RootHtmlElement";

class AppRoot extends History<Event$> {
    name: string;
    isShow = true;
    mains: string[] = [
        "<app-main></app-main>",
        "<app-main_1></app-main_1>"
    ];
    mainsCounter = 0;
    currentMain = this.mains[this.mainsCounter];
    root: RootElement;

    constructor(root: RootElement, startEvent: Event$) {
        super(startEvent);
        this.root = root;
        this.name = root.tagName;
    }

    onCreate(): void {
        this.state = Event$.BEFORE_INIT;
    }

    onInit(): void {
        this.state = Event$.INIT;

        this.root.collect(
            NextMain$.subscribe(() => {
                this.mainsCounter++;
                if (this.mainsCounter >= this.mains.length) {
                    this.mainsCounter = 0;
                }

                this.currentMain = this.mains[this.mainsCounter];
                this.root.detectChanges();
            })
        );
    }

    onDestroy(): void {
        this.state = Event$.DESTROY;
    }
}

export const AppRootElement = getElement<Event$>(
    {
        htmlTemplate: customTemplate.get(E_SUBS_TEMPLATE.CONTAINER),
        startEvent: Event$.UNDEFINED,
        className: AppRoot,
    }
);
