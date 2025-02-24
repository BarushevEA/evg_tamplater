const fs = require('fs');
const env = require('./utils');
const options = require('../buildOptions/templateOptions');
const {cpSync} = require("fs");
const {getStringFromFile} = require("../../../libs/js/custom_element/getStringFromFile");

const buildFilePath = env.getBuildFilePath();
const htmlTemplates = options.htmlTemplates;
const assetsPath = env.getAssetsPath();

fs.rmSync(assetsPath, {recursive: true, force: true});
fs.mkdirSync(assetsPath);
cpSync(env.getAssetsDirPath(), assetsPath, {recursive: true, force: true});

console.log(buildFilePath);

fs.readFile(buildFilePath, (error, data) => {
    handleError(error);
    console.log();
    console.log("=> TEMPLATE INJECTION START");
    console.log(htmlTemplates);
    const start = Date.now();

    let jsFileStr = data.toString();

    for (const templateMarker in htmlTemplates) {
        const fileName = htmlTemplates[templateMarker];
        const templatePath = env.getTemplatePath(fileName);
        const templateStr = getStringFromFile(templatePath);
        jsFileStr = jsFileStr.replace(templateMarker, templateStr);
    }

    fs.writeFile(buildFilePath, jsFileStr, (error) => handleError(error));
    console.log("=> TEMPLATE INJECTION FINISH", `${Date.now() - start} ms.`);
});

function handleError(error) {
    if (error) throw error;
}
