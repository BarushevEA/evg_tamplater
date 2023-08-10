import {History} from "evg_event_history/src/outLib/history";
import {Event$} from "evg_event_history/src/outLib/env";
import {APP_TAG_NAME} from "./env";
import {appendChild, getStyle, runWhenDocumentReady} from "../../../../libs/utils/utils";
import {getRootStyles, registerElements} from "../../../../libs/elements/registrator";
import {AppRootElement} from "./customElements/appRootElement";
import {HeaderElement} from "./customElements/headerElement";
import {MainElement} from "./customElements/mainElement";
import {FooterElement} from "./customElements/footerElement";
import {customTemplate, E_SUBS_TEMPLATE} from "../templates/templateMarkers";
import {AppDocument} from "../../../../libs/env/browserVariables";

registerElements([
    {tagName: APP_TAG_NAME, targetElement: AppRootElement},
    {tagName: "app-header", targetElement: HeaderElement},
    {tagName: "app-main", targetElement: MainElement},
    {tagName: "app-footer", targetElement: FooterElement},
]);

class Manager extends History<Event$> {
    private appElement: HTMLElement;

    constructor() {
        super(Event$.UNDEFINED);
    }

    public run(): void {
        this.state = Event$.BEFORE_PROCESS;

        runWhenDocumentReady(() => {
            this.process();
        });
    }

    private process(): void {
        this.state = Event$.PROCESS;

        this.init();
        this.start();
    }

    private init(): void {
        this.state = Event$.INIT;

        this.appElement = AppDocument.createElement(APP_TAG_NAME);
    }

    private start(): void {
        this.state = Event$.START;

        const rootStyle = getStyle(getRootStyles());
        const mainStyle = getStyle(customTemplate.get(E_SUBS_TEMPLATE.STYLE));

        appendChild(AppDocument.head, rootStyle);
        appendChild(AppDocument.head, mainStyle);
        appendChild(AppDocument.body, this.appElement);
    }
}

export const MANAGER = new Manager();
