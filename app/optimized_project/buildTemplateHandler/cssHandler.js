const fs = require('fs');
const env = require('./utils');
const options = require('../buildOptions/templateOptions');
const flags = require('../buildOptions/flags');

const cssPath = env.getCSSPath();
const buildFilePath = env.getBuildFilePath();

fs.readFile(cssPath, (error, data) => {
    handleError(error);

    let cssFileStr = data.toString();
    cssFileStr = cssFileStr.replaceAll("/*# sourceMappingURL=style.css.map */", "");
    cssFileStr = cssFileStr.replaceAll("\r", "");
    cssFileStr = cssFileStr.replaceAll("\n", "");
    cssFileStr = cssFileStr.replaceAll("  ", "");
    cssFileStr = cssFileStr.replaceAll("\"", "'");

    fs.readFile(buildFilePath, (error, data) => {
        handleError(error);

        let jsFileStr = data.toString();

        if (flags.flag.isCssEncrypt) {
            const encryptedObj = getEncryptedObject(jsFileStr, cssFileStr);
            jsFileStr = encryptedObj.js;
            cssFileStr = encryptedObj.css;
        }

        jsFileStr = jsFileStr.replace(options.CSS_Marker, cssFileStr);

        fs.writeFile(buildFilePath, jsFileStr, function (error) {
            handleError(error);
        });
    });
});

function getEncryptedObject(js, css) {
    let i = 0;
    const marker = `class='`, arr = [], mod = [], cls_s = [];

    while ((i = js.indexOf(marker, i)) > -1) {
        i += marker.length;
        let str = "", sym = "";
        while ((sym = js[i]) !== "'") i++ && (str += sym);

        if (arr.includes(str)) continue;
        arr.push(str) && mod.push(str);
        str.split(" ").forEach(cls => (cls && !cls_s.includes(cls)) && cls_s.push(cls));
    }

    cls_s.sort((a, b) => (a.length > b.length) ? -1 : 1);

    cls_s.forEach((cls, i) => {
        mod.forEach((clsStr, k) => mod[k] = clsStr.replaceAll(cls, "" + getClassName(i)));
        css = css.replaceAll(`.${cls} `, `.${getClassName(i)} `);
    });

    arr.forEach((clsStr, i) => js = js.replaceAll(`${marker}${clsStr}'`, `${marker}${mod[i]}'`));

    return {js: js, css: css};
}

function getClassName(ind) {
    let name = "";
    const symbols = "qwertyuiop", strInd = "" + ind;

    for (let i = 0; i < strInd.length; i++) name += symbols[+strInd[i]];

    return name;
}

function handleError(error) {
    if (error) {
        throw error;
    }
}
