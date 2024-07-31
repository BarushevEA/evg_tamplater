import {APP_INFO} from "./settings/info";
import {APP_LOCALE} from "../../../libs/elements/AppLocalization/LocationManager";
import {LOCATION} from "../../../libs/elements/AppLocalization/location";
import {MODULES} from "./settings/modules";
import {RENDER_MANAGER} from "../../../libs/elements/rootElements/managers/RenderManager";
import {E_APP_MODE} from "../../../libs/enums/E_APP_MODE";

APP_INFO.init();
APP_LOCALE.setLocation(LOCATION.EN);
RENDER_MANAGER.register(MODULES);
RENDER_MANAGER.run(E_APP_MODE.WIDGET_APPLICATION);
