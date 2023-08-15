import {Event$} from "evg_event_history/src/outLib/env";
import {getElement} from "../../../../../libs/elements/rootElements/RootHtmlElement";
import {customTemplate, E_SUBS_TEMPLATE} from "../../templates/templateMarkers";
import {NextMain$} from "../services/headerService";
import {History} from "evg_event_history/src/outLib/history";
import {RootElement} from "../../../../../libs/env/types";

class Header extends History<Event$> {
    text = "SERG header start after:";
    name = this.text;
    buttonName = "NEXT MAIN";
    counter1 = 0;
    root

    constructor(root: RootElement, startEvent: Event$) {
        super(startEvent);
        this.root = root;
    }

    clickHeader(evt: MouseEvent): void {
        this.state = Event$.CLICK;

        this.counter1++;
        console.log("clickHeader(evt: MouseEvent): void " + this.counter1);
        evt.stopPropagation();
        evt.preventDefault();
    }

    nextMain(evt: MouseEvent): void {
        this.state = Event$.CLICK;

        evt.stopPropagation();
        evt.preventDefault();

        NextMain$.next(true);
    }

    onCreate(): void {
        this.state = Event$.BEFORE_INIT;
    }

    onInit(): void {
        this.state = Event$.INIT;

        let counter = 0;

        const timer = setInterval(() => {
            this.name = this.text + " " + counter + " ";
            this.root.detectChanges();
            counter++;
            if (counter > 5) {
                clearInterval(timer);
            }
        }, 1000);
    }

    onDestroy(): void {
        this.state = Event$.DESTROY;
    }
}

export const HeaderElement = getElement<Event$>(
    {
        htmlTemplate: customTemplate.get(E_SUBS_TEMPLATE.HEADER),
        startEvent: Event$.UNDEFINED,
        className: Header,
    }
);
