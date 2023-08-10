import {APP_INFO} from "./APP_INFO";
import {MANAGER} from "./handlers/manager";
import {RegisterRootElements} from "../../../libs/elements/registerRootElements";

console.log(APP_INFO.description);
RegisterRootElements();
MANAGER.run();
