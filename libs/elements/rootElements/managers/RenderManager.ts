import {appendChild, createElement, getStyle, runWhenDocumentReady} from "../../../utils/utils";
import {getRootStyles, REG_OPTIONS, registerElements} from "../../registrator";
import {APP_TAG_NAME} from "./APP_TAG_NAME";
import {RegisterRootElements} from "../../registerRootElements";
import {AppDocument} from "../../../env/browserVariables";

export class RenderManager {
    private appElement: HTMLElement;

    constructor() {
    }

    public register(options: REG_OPTIONS): void {
        registerElements(options);
    }

    public run(): void {
        runWhenDocumentReady(() => {
            this.process();
        });
    }

    private process(): void {
        this.init();
        this.start();
    }

    private init(): void {
        this.appElement = createElement(APP_TAG_NAME);
    }

    private start(): void {
        const rootStyle = getStyle(getRootStyles());
        const mainStyle = getStyle("APP_EXAMPLE_____STYLE");

        appendChild(AppDocument.head, rootStyle);
        appendChild(AppDocument.head, mainStyle);
        appendChild(AppDocument.body, this.appElement);
    }
}

RegisterRootElements();

export const RENDER_MANAGER = new RenderManager();
