import {History} from "evg_event_history/src/outLib/history";
import {Event$} from "evg_event_history/src/outLib/env";
import {appendChild, getStyle, runWhenDocumentReady} from "../../../utils/utils";
import {getRootStyles} from "../../registrator";
import {APP_TAG_NAME} from "./APP_TAG_NAME";
import {TemplateMap, TemplatesHandler} from "../../../utils/Templater";
import {RegisterRootElements} from "../../registerRootElements";
import {AppDocument} from "../../../env/browserVariables";

export enum E_BASE_TEMPLATE {
    STYLE,
}

const templateMap: TemplateMap = {
    [E_BASE_TEMPLATE.STYLE]: "APP_EXAMPLE__STYLE",
}

const baseTemplate = new TemplatesHandler(templateMap);

export class RenderManager extends History<Event$> {
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
        const mainStyle = getStyle(baseTemplate.get(E_BASE_TEMPLATE.STYLE));

        appendChild(AppDocument.head, rootStyle);
        appendChild(AppDocument.head, mainStyle);
        appendChild(AppDocument.body, this.appElement);
    }
}

RegisterRootElements();

export const RENDER_MANAGER = new RenderManager();
