const path = require("path");
const appPath = require("../buildOptions/appPath");

// Binary JS path
exports.getBuildDirPath = () => {
    return path.join(__dirname, appPath.buildDirLevel, appPath.buildDirPath);
};
exports.getBuildFilePath = () => {
    return path.join(exports.getBuildDirPath(), appPath.buildFileName);
};
// App template full path
exports.getTemplatePath = (fileName) => {
    return path.join(__dirname, appPath.HTMLTemplatesDirPath, fileName);
};
// App style full path
exports.getCSSPath = () => {
    return path.join(__dirname, appPath.CSSDirPath, "style.css");
};

exports.getModulesPath = () => {
    return path.join(__dirname, appPath.ModulesPath);
};

const symbols1 = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
const symbols2 = "01234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
const symbols3 = "_-";
const len1 = symbols1.length - 1;
const len2 = symbols2.length - 1;
const len3 = symbols3.length - 1;

exports.getSymbols = (length) => {
    length = Math.round(length / 2);
    let encrypted = "";
    encrypted += symbols1[Math.round(Math.random() * len1)] +
        (Math.round(Math.random()) ?
            symbols3[Math.round(Math.random() * len3)] :
            symbols2[Math.round(Math.random() * len2)]);

    for (let i = 1; i < length; i++) {
        encrypted += symbols2[Math.round(Math.random() * len2)] +
            (Math.round(Math.random()) ?
                symbols3[Math.round(Math.random() * len3)] :
                symbols2[Math.round(Math.random() * len2)]);
    }

    return encrypted
};
