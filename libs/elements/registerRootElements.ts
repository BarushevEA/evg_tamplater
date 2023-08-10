import {registerElements} from "./registrator";
import {AppText} from "./rootElements/appText";
import {E_ROOT_TAG} from "./utils";

export function RegisterRootElements() {
    registerElements([
        {tagName: E_ROOT_TAG.TEXT_VALUE, targetElement: AppText},
    ]);
}
