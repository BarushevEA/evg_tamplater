import {registerElements} from "./registrator";
import {AppText} from "./rootElements/appText";
import {QSIBind} from "./rootElements/qsiBind";
import {E_ROOT_TAG} from "./utils";

export function RegisterRootElements() {
    registerElements([
        {tagName: E_ROOT_TAG.TEXT_VALUE.toLowerCase(), targetElement: AppText},
        {tagName: E_ROOT_TAG.QSI_BIND.toLowerCase(), targetElement: QSIBind},
    ]);
}
