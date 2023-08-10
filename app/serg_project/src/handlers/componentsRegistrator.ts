import {registerElements} from "../../../../libs/elements/registrator";
import {AppRootElement} from "./components/appRootElement";
import {HeaderElement} from "./components/headerElement";
import {MainElement} from "./components/mainElement";
import {FooterElement} from "./components/footerElement";
import {Main_1_Element} from "./components/main_1_Element";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";

export function registerModules() {
    registerElements([
        {tagName: APP_TAG_NAME, targetElement: AppRootElement},
        {tagName: "app-header", targetElement: HeaderElement},
        {tagName: "app-main", targetElement: MainElement},
        {tagName: "app-main_1", targetElement: Main_1_Element},
        {tagName: "app-footer", targetElement: FooterElement},
    ]);
}
