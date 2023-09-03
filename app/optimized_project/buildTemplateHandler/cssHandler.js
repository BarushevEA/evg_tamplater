const fs = require('fs');
const env = require('./utils');
const options = require('../buildOptions/templateOptions');
const encrypt = require('../buildOptions/cssEncryptExcludeList');
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

function getEncryptedObject(jsFileStr, cssFileStr) {
    let index = 0;
    const classMarker = `class='`;
    const classStrList = [];
    const classStrListModified = [];
    const classes = [];

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
            });
        }
    }

    classes.sort((a, b) => {
        if (a.length > b.length) return -1;
        return 1;
    });

    console.log("=================> Encrypted classes:", classes);

    classes.forEach((cls, index) => {
        classStrListModified.forEach((clsStr, i) => {
            classStrListModified[i] = clsStr.replaceAll(cls, getClassName(index));
        });
        cssFileStr = cssFileStr.replaceAll(`.${cls} `, `.${getClassName(index)} `);
    });

    classStrList.forEach((clsStr, index) => {
        jsFileStr = jsFileStr.replaceAll(`${classMarker}${clsStr}'`, `${classMarker}${classStrListModified[index]}'`);
    });

    return {
        js: jsFileStr,
        css: cssFileStr,
    };
}

function getClassName(index) {
    let cssClass = "";
    const symbols = "qwertyuiop";
    const smbIndex = "" + index;

    for (let i = 0; i < smbIndex.length; i++) {
        const ind = +smbIndex[i];
        cssClass += symbols[ind];
    }

    return cssClass;
}

function handleError(error) {
    if (error) {
        throw error;
    }
}
