import {appendChild, createElement, getDiv, getStyle, log, runWhenDocumentReady} from "../../../utils/utils";
import {getRootStyles, REG_OPTIONS, registerElements} from "../../registrator/registrator";
import {APP_TAG_NAME} from "./APP_TAG_NAME";
import {RegisterRootElements} from "../../registrator/registerRootElements";
import {AppDocument} from "../../../env/browserVariables";
import {E_APP_MODE} from "../../../enums/E_APP_MODE";

export class RenderManager {
    private appElement: HTMLElement;
    appMode: E_APP_MODE = E_APP_MODE.GENERAL_APPLICATION;
    widgetRoot = getDiv();

    constructor() {
    }

    public register(options: REG_OPTIONS): void {
        registerElements(options);
    }

    public run(appMode?: E_APP_MODE, widgetRoot?: HTMLElement): void {
        if (appMode) this.appMode = appMode;
        if (widgetRoot) this.widgetRoot = widgetRoot;

        runWhenDocumentReady(() => {
            this.process();
        });
    }

    private process(): void {
        this.init();
        this.start();
    }

    private init(): void {
        if (this.appMode === E_APP_MODE.CUSTOM_COMPONENT) return;
        this.appElement = createElement(APP_TAG_NAME);
    }

    private start(): void {
        const rootStyle = getStyle(getRootStyles());
        const mainStyle = getStyle("APP_EXAMPLE_____STYLE");

        switch (this.appMode) {
            case E_APP_MODE.CUSTOM_COMPONENT:
                this.setStylesToHead(rootStyle, mainStyle);
                break;
            case E_APP_MODE.GENERAL_APPLICATION:
                this.setStylesToHead(rootStyle, mainStyle);
                appendChild(AppDocument.body, this.appElement)
                break;
            case E_APP_MODE.WIDGET_APPLICATION:
                let shadowRoot = this.widgetRoot.attachShadow({mode: 'closed'});
                appendChild(shadowRoot, rootStyle);
                appendChild(shadowRoot, mainStyle);
                appendChild(shadowRoot, this.appElement);
                appendChild(AppDocument.body, this.widgetRoot);
        }

        log(this.appMode);
    }

    private setStylesToHead(rootStyle: HTMLElement, mainStyle: HTMLElement) {
        appendChild(AppDocument.head, rootStyle);
        appendChild(AppDocument.head, mainStyle);
    }
}

RegisterRootElements();

export const RENDER_MANAGER = new RenderManager();
