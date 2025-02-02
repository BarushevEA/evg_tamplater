const {readFileSync} = require("node:fs");

exports.getStringFromFile = (filePath) => {
    const body = readFileSync(filePath);
    let bodyStr = body.toString();
    bodyStr = bodyStr.replaceAll('"', "'");
    bodyStr = bodyStr.replaceAll("\r", "");
    bodyStr = bodyStr.replaceAll("\n", "");
    for (; bodyStr.indexOf("  ") > -1;) bodyStr = bodyStr.replaceAll("  ", " ");
    bodyStr = bodyStr.replaceAll("> <", "><");
    bodyStr = bodyStr.replaceAll("{{", "<qsi-bind>");
    bodyStr = bodyStr.replaceAll("}}", "</qsi-bind>");

    return bodyStr;
}
