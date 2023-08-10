import {Event$} from "evg_event_history/src/outLib/env";
import {AbstractHtmlElement} from "../../../../../libs/elements/rootElements/AbstractHtmlElement";
import {customTemplate, E_SUBS_TEMPLATE} from "../../templates/templateMarkers";
import {ELEMENT_OPTIONS} from "../../../../../libs/elements/utils";
import {NextMain$} from "../services/headerService";

const options: ELEMENT_OPTIONS<Event$> = {
    htmlTemplate: customTemplate.get(E_SUBS_TEMPLATE.HEADER),
    startEvent: Event$.UNDEFINED
}

export class HeaderElement extends AbstractHtmlElement<Event$> {
    text = "SERG header start after:";
    name = this.text;
    buttonName = "NEXT MAIN";
    counter1 = 0;

    constructor() {
        super(options);
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
            this.detectChanges();
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
