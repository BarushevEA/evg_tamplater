const path = require("path");
const {copySrcToDistribution} = require("../../../libs/js/custom_element/copySrcToDistribution");
const {getSubstringFromFile} = require("../../../libs/js/custom_element/getSubstringFromFile");
const {getCustomTagName} = require("../../../libs/js/custom_element/getCustomTagName");
const {replaceInFile} = require("../../../libs/js/custom_element/replaceInFile");
const {deleteFileSync} = require("../../../libs/js/custom_element/deleteFileSync");
const {deleteFileLineBy} = require("../../../libs/js/custom_element/deleteFileLineBy");
const {registerCustomElement} = require("../../../libs/js/custom_element/registerCustomElement");

// Paths to the directories
const distributionPath = path.join(__dirname, "../distribution");
const indexTs = path.join(distributionPath, "/index.ts");
const srcPath = path.join(__dirname, "../src");
const settingsDirPath = path.join(distributionPath, "/settings");
const infoFilePath = path.join(settingsDirPath, "/info.ts");
const modulesPath = path.join(settingsDirPath, "/modules.ts");

copySrcToDistribution(srcPath, distributionPath);

const customElementName = getSubstringFromFile(infoFilePath, "AppInfo('", "'")[0];
const customElementVersion = getSubstringFromFile(infoFilePath, `AppInfo('${customElementName}',`, ")")[0];
const customElementTagName = customElementName ? getCustomTagName(customElementName) : "";

console.log(`Custom element name: ${customElementName}`);
console.log(`Custom element version: ${customElementVersion}`);
console.log(`Custom element tag name: ${customElementTagName}`);

deleteFileLineBy(modulesPath, [
    "import {APP_TAG_NAME}",
    "import {START_ROUTES_REGISTRATION}",
    "START_ROUTES_REGISTRATION()"
]);

replaceInFile(
    modulesPath,
    [
        {target: "MODULES", replacer: `CSM_${customElementName.toUpperCase()}`},
        {target: "APP_TAG_NAME", replacer: `"${customElementTagName}"`}
    ]);

deleteFileSync(indexTs);

registerCustomElement({
    name: customElementTagName,
    version: customElementVersion,
    destination: `../../../../custom_elements/${customElementName}/distribution/settings/modules`,
    description: "Custom element for sharing"
});
