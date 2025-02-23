const fs = require('fs');
const env = require('./utils');
const sass = require('sass');
const options = require('../buildOptions/templateOptions');
const encrypt = require('../buildOptions/cssEncryptList');
const flags = require('../buildOptions/flags');
const {cssPrefixLength} = require("../buildOptions/flags");
const {getSymbols} = require("./utils");

const cssPath = env.getCSSPath();
const buildFilePath = env.getBuildFilePath();

function handleCssStr(cssFileStr) {
    cssFileStr = cssFileStr.replaceAll("/*# sourceMappingURL=style.css.map */", "")
        .replaceAll("\r", "")
        .replaceAll("\n", "")
        .replaceAll("  ", "")
        .replaceAll("\"", "'");

    fs.readFile(buildFilePath, (error, data) => {
        handleError(error);
        console.log();
        console.log("=> CSS INJECTION START");
        const start = Date.now();

        let jsFileStr = data.toString();

        if (flags.flag.isCssEncrypt) {
            console.log("==> CSS ENCRYPTION START");
            console.log("cssExcludeList", encrypt.cssExcludeList);
            console.log("cssIncludeList", encrypt.cssIncludeList);
            console.log("isJsCssProcess", flags.flag.isJsCssProcess);
            const startTime = Date.now();
            const encryptedObj = getEncryptedObject(jsFileStr, cssFileStr);
            jsFileStr = encryptedObj.js;
            cssFileStr = encryptedObj.css;
            console.log("==> CSS ENCRYPTION FINISH", `${Date.now() - startTime} ms.`);
        }

        jsFileStr = jsFileStr.replace(options.CSS_Marker, cssFileStr);

        fs.writeFile(buildFilePath, jsFileStr, function (error) {
            handleError(error);
        });

        console.log("=> CSS INJECTION FINISH", `${Date.now() - start} ms.`);
    });
}

if (fs.existsSync(cssPath)) {
    console.log("CSS compile begin:", cssPath);

    fs.readFile(cssPath, (error, data) => {
        handleError(error);

        let cssFileStr = data.toString();
        handleCssStr(cssFileStr);
    });
} else {
    const scssPath = env.getSCSSPath();
    console.log("SCSS compile begin:", scssPath);

    try {
        const result = sass.compile(scssPath);
        let cssFileStr = result.css.toString();

        handleCssStr(cssFileStr);
    } catch (error) {
        handleError(error);
    }
}

function pushToClasses(cls, classes) {
    if (cls && classes.indexOf(cls) === -1) {
        let isExcluded = false;
        for (const excludeCls of encrypt.cssExcludeList) {
            if (cls === excludeCls) {
                isExcluded = true;
                break;
            }
        }
        !isExcluded && classes.push(cls);
    }
}

function getEncryptedObject(jsFileStr, cssFileStr) {
    let index = 0;
    const classMarker = `class='`;
    const classStrList = [];
    const classStrListModified = [];
    const classes = encrypt.cssIncludeList;

    const dataMarker = `qsi-cls='`;
    const dataStrList = [];
    const dataStrListModified = [];

    while ((index = jsFileStr.indexOf(dataMarker, index)) > -1) {
        index += dataMarker.length;
        let dataStr = "";
        let sym = "";
        while ((sym = jsFileStr[index]) !== "'") {
            dataStr += sym;
            index++;
        }

        if (dataStrList.indexOf(dataStr) === -1) {
            dataStrList.push(dataStr);
            dataStrListModified.push(dataStr);
            dataStr.split(" ").forEach(dataBlock => {
                if (!dataBlock) return;

                if (dataBlock.includes("?")) {
                    const clsStr = dataBlock.split("?")[1];
                    clsStr.split(":").forEach(cls => {
                        pushToClasses(cls, classes);
                    });
                    return;
                }

                if (dataBlock.includes(":")) {
                    const cls = dataBlock.split(":")[0];
                    pushToClasses(cls, classes);
                    return;
                }

                pushToClasses(dataBlock, classes);
            })
        }
    }

    while ((index = jsFileStr.indexOf(classMarker, index)) > -1) {
        index += classMarker.length;
        let clsStr = "";
        let sym = "";
        while ((sym = jsFileStr[index]) !== "'") {
            clsStr += sym;
            index++;
        }

        if (classStrList.indexOf(clsStr) === -1) {
            classStrList.push(clsStr);
            classStrListModified.push(clsStr);

            clsStr.split(" ").forEach(cls => {
                pushToClasses(cls, classes);
            });
        }
    }

    classes.sort((a, b) => {
        if (a.length > b.length) return -1;
        return 1;
    });

    classes.forEach((cls, index) => {
        classStrListModified.forEach((clsStr, i) => {
            classStrListModified[i] = clsStr.replaceAll(cls, getClassName(index));
        });

        dataStrListModified.forEach((clsStr, i) => {
            dataStrListModified[i] = clsStr.replaceAll(cls, getClassName(index));
        });

        cssFileStr = cssFileStr.replaceAll(`.${cls} `, `.${getClassName(index)} `);
        cssFileStr = cssFileStr.replaceAll(`.${cls}:`, `.${getClassName(index)}:`);
        console.log(`[.${cls}]`, `encrypt to => [.${getClassName(index)}]`);
        if (flags.flag.isJsCssProcess) {
            jsFileStr = jsFileStr.replaceAll(`"${cls}"`, `"${getClassName(index)}"`);
            jsFileStr = jsFileStr.replaceAll(`".${cls}"`, `".${getClassName(index)}"`);
        }
    });

    classStrList.forEach((clsStr, index) => {
        jsFileStr = jsFileStr.replaceAll(`${classMarker}${clsStr}'`, `${classMarker}${classStrListModified[index]}'`);
    });

    dataStrList.forEach((dataStr, index) => {
        jsFileStr = jsFileStr.replaceAll(`${dataMarker}${dataStr}'`, `${dataMarker}${dataStrListModified[index]}'`);
    })

    return {
        js: jsFileStr,
        css: cssFileStr,
    };
}

const classes = [];

function getClassName(index) {
    let className = classes[index];
    if (className) return className;

    let cssClass = "";
    const symbols = "qwertyuiop";
    const smbIndex = "" + index;

    for (let i = 0; i < smbIndex.length; i++) {
        const ind = +smbIndex[i];
        cssClass += symbols[ind];
    }

    className = getSymbols(cssPrefixLength) + cssClass;
    classes.push(className);

    return className;
}

function handleError(error) {
    if (error) {
        throw error;
    }
}
