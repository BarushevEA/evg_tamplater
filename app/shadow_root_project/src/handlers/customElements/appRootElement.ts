import {Event$} from "evg_event_history/src/outLib/env";
import {AbstractHtmlElement} from "../../../../../libs/elements/rootElements/AbstractHtmlElement";
import {ELEMENT_OPTIONS} from "../../../../../libs/elements/utils";
import {appendChild, getStyle} from "../../../../../libs/utils/utils";
import {getRootStyles} from "../../../../../libs/elements/registrator";
import {customTemplate, E_SUBS_TEMPLATE} from "../../templates/templateMarkers";

import {AppDocument} from "../../../../../libs/env/browserVariables";

const options: ELEMENT_OPTIONS<Event$> = {
    htmlTemplate: "",
    startEvent: Event$.UNDEFINED
}

export class AppRootElement extends AbstractHtmlElement<Event$> {
    private shadow: ShadowRoot;
    private shadowElement: HTMLElement;

    constructor() {
        super(options);
    }

    onCreate(): void {
        this.state = Event$.BEFORE_INIT;

        this.initShadow();
    }

    private initShadow() {
        this.shadow = this.attachShadow({mode: 'closed'});

        const rootStyle = getStyle(getRootStyles());
        const mainStyle = getStyle(customTemplate.get(E_SUBS_TEMPLATE.STYLE));

        this.shadowElement = AppDocument.createElement("shadow-root");

        appendChild(this.shadow, rootStyle);
        appendChild(this.shadow, mainStyle);
        appendChild(this.shadow, this.shadowElement);
    }

    onInit(): void {
        this.state = Event$.INIT;
    }

    onDestroy(): void {
        this.state = Event$.DESTROY;
    }
}
