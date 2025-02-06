import {Container} from "../modules/elements/container/container";
import {Header} from "../modules/elements/header/header";
import {Footer} from "../modules/elements/footer/footer";
import {Main} from "../modules/elements/main/main";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {START_SUB_ROUTES_REGISTRATION} from "./subRoutes";

export const CSM_SUBROUTE_TEST: REG_OPTIONS = [
    getOption(AppRoot, "csm-subroute-test", "<style>.app{padding: 0;margin: 0;box-sizing: border-box;overflow: auto;width: 100%;height: 100%;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;min-width: 200px;min-height: 200px;}.app .buttons_panel{position: absolute;top: 10px;right: 10px;width: 200px;height: 50px;display: flex;flex-flow: row nowrap;align-items: center;justify-content: flex-start;}.app .buttons_panel .button{width: 60px;height: 30px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;overflow: hidden;}.app .buttons_panel .button:hover{opacity: 0.5;}.app .container{width: 100%;height: 100%;min-width: 100%;min-height: 200px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;background: #ebd0b1;}</style> <csmsubroutetest-container></csmsubroutetest-container>", true),
    getOption(Main, "csmsubroutetest-main", "<div>Hello main.html</div>"),
    getOption(Footer, "csmsubroutetest-footer", "<div>Hello footer.html</div>"),
    getOption(Header, "csmsubroutetest-header", "<div>Hello header.html</div>"),
    getOption(Container, "csmsubroutetest-container", "<div class='app'><div qsi-cls='container'><div qsi-cls='buttons_panel'><div qsi-cls='button' qsi-click='clickMain'>Main </div><div qsi-cls='button' qsi-click='clickHeader'>Header </div><div qsi-cls='button' qsi-click='clickFooter'>Footer </div></div><qsi-subroute name='test'></qsi-subroute></div></div>"),
];

START_SUB_ROUTES_REGISTRATION();
