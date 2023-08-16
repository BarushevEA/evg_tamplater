import {REG_OPTIONS} from "../../../libs/elements/registrator";
import {AppRootElement} from "./handlers/components/appRootElement";
import {HeaderElement} from "./handlers/components/headerElement";
import {MainElement} from "./handlers/components/mainElement";
import {FooterElement} from "./handlers/components/footerElement";
import {Main_1_Element} from "./handlers/components/main_1_Element";
import {APP_TAG_NAME} from "../../../libs/elements/rootElements/managers/APP_TAG_NAME";

export const MODULES: REG_OPTIONS = [
    {tagName: APP_TAG_NAME, targetElement: AppRootElement},
    {tagName: "app-header", targetElement: HeaderElement},
    {tagName: "app-main", targetElement: MainElement},
    {tagName: "app-main_1", targetElement: Main_1_Element},
    {tagName: "app-footer", targetElement: FooterElement},
];
