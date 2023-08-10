import {getAppInfo} from "../../../utils/utils";

export const APP_TAG_NAME = (<any>getAppInfo().name).replaceAll("_", "-");
