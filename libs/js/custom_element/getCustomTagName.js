const ROOT_CUSTOM_PREFIX = "csm-";

const symbols = "abcdefghijklmnopqrstuvwxyz";
exports.getCustomTagName = function (name) {
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

    return ROOT_CUSTOM_PREFIX + appSuffix;
}


