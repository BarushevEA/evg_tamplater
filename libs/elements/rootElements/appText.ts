import {OnCreate, OnDestroy, OnInit} from "../../env/types";
import {getCustomElement} from "./RootHtmlElement";

class AppTxt implements OnCreate, OnInit, OnDestroy {
    constructor() {
    }

    onCreate(): void {
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}

export const AppText = getCustomElement<any>(
    {
        htmlTemplate: "",
        startEvent: 0,
        className: AppTxt
    }
);
