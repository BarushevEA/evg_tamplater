import {APP_INFO} from "./APP_INFO";
import {APP_LOCALE} from "../../../libs/elements/AppLocalization/LocationManager";
import {LOCATION} from "../../../libs/elements/AppLocalization/location";
import {registerModules} from "./handlers/componentsRegistrator";
import {RENDER_MANAGER} from "../../../libs/elements/rootElements/managers/RenderManager";

APP_INFO.init();
APP_LOCALE.set(LOCATION.EN);
registerModules();
RENDER_MANAGER.run();
