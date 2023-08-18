import {getAppInfo} from "../../../utils/utils";

const name = getAppInfo().name;
const symbols = "abcdefghijklmnopqrstuvwxyz";
let appSuffix = "";

for (let i = 0; i < name.length; i++) {
    const nameSymbol = name[i];
    let result = ""

    for (let j = 0; j < symbols.length; j++) {
        const symbol = symbols[j];
        if (symbol === nameSymbol.toLowerCase()) {
            result = symbol;
            break;
        }
    }

    if (!result) {
        appSuffix += "-";
    } else {
        appSuffix += result;
    }
}

export const APP_TAG_NAME = "app-" + appSuffix;
