import {Event$} from "evg_event_history/src/outLib/env";
import {AbstractHtmlElement} from "../../../../../libs/elements/rootElements/AbstractHtmlElement";
import {customTemplate, E_SUBS_TEMPLATE} from "../../templates/templateMarkers";
import {ELEMENT_OPTIONS} from "../../../../../libs/elements/utils";
import {NextMain$} from "../services/headerService";

const options: ELEMENT_OPTIONS<Event$> = {
    htmlTemplate: customTemplate.get(E_SUBS_TEMPLATE.CONTAINER),
    startEvent: Event$.UNDEFINED
}

export class AppRootElement extends AbstractHtmlElement<Event$> {
    name = this.tagName;
    isShow = true;
    mains: string[] = [
        "<app-main></app-main>",
        "<app-main_1></app-main_1>"
    ];
    mainsCounter = 0;
    currentMain = this.mains[this.mainsCounter];

    constructor() {
        super(options);
    }

    onCreate(): void {
        this.state = Event$.BEFORE_INIT;
    }

    onInit(): void {
        this.state = Event$.INIT;

        this.collect(
            NextMain$.subscribe(() => {
                this.mainsCounter++;
                if (this.mainsCounter >= this.mains.length) {
                    this.mainsCounter = 0;
                }

                this.currentMain = this.mains[this.mainsCounter];
                this.detectChanges();
            })
        );
    }

    onDestroy(): void {
        this.state = Event$.DESTROY;
    }
}
