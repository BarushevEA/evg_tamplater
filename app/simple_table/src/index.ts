import {APP_INFO} from "./settings/info";
import {APP_LOCALE} from "../../../libs/elements/AppLocalization/LocationManager";
import {LOCATION} from "../../../libs/elements/AppLocalization/location";
import {MODULES} from "./settings/modules";
import {RENDER_MANAGER} from "../../../libs/elements/rootElements/managers/RenderManager";

APP_INFO.init();
APP_LOCALE.set(LOCATION.EN);
RENDER_MANAGER.register(MODULES);
RENDER_MANAGER.run(true);
