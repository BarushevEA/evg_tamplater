import {getOption, registerElements} from "./registrator";
import {E_ROOT_TAG} from "../../enums/E_ROOT_TAG";
import {QSI_APP_ROOT_AppTxt} from "../rootElements/appText";
import {QSI_APP_ROOT_QsiBind} from "../rootElements/qsiBind";
import {QSI_APP_ROOT_AppRoute} from "../rootElements/appRoute";
import {QSI_APP_ROOT_SubRoute} from "../rootElements/appSubRout";

export function RegisterRootElements() {
    registerElements([
        getOption(QSI_APP_ROOT_AppTxt, E_ROOT_TAG.TEXT_VALUE.toLowerCase(), ""),
        getOption(QSI_APP_ROOT_QsiBind, E_ROOT_TAG.QSI_BIND.toLowerCase(), ""),
        getOption(QSI_APP_ROOT_AppRoute, E_ROOT_TAG.APP_ROUTE.toLowerCase(), ""),
        getOption(QSI_APP_ROOT_SubRoute, E_ROOT_TAG.APP_SUB_ROUTE.toLowerCase(), ""),
    ])
}
