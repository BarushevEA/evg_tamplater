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
