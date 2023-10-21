const fs = require('fs');
const env = require('./utils');
const options = require('../buildOptions/templateOptions');

const buildFilePath = env.getBuildFilePath();
const htmlTemplates = options.htmlTemplates;

console.log(buildFilePath);

function getStringFromFile(filePath) {
    const body = fs.readFileSync(filePath);
    let bodyStr = body.toString();
    bodyStr = bodyStr.replaceAll('"', "'");
    bodyStr = bodyStr.replaceAll("\r", "");
    bodyStr = bodyStr.replaceAll("\n", "");
    for (; bodyStr.indexOf("  ") > -1;) bodyStr = bodyStr.replaceAll("  ", " ");
    bodyStr = bodyStr.replaceAll("> <", "><");

    return bodyStr;
}

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
