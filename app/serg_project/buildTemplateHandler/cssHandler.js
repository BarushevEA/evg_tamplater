const fs = require('fs');
const env = require('./utils');
const options = require('../buildOptions/templateOptions');

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
        jsFileStr = jsFileStr.replace(options.CSS_Marker, cssFileStr);

        fs.writeFile(buildFilePath, jsFileStr, function (error) {
            handleError(error);
        });
    });
});

function handleError(error) {
    if (error) {
        throw error;
    }
}
