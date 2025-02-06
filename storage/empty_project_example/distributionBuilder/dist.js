const path = require("path");
const {copySrcToDistribution} = require("../../../libs/js/custom_element/copySrcToDistribution");
const {getSubstringFromFile} = require("../../../libs/js/custom_element/getSubstringFromFile");
const {getCustomTagName} = require("../../../libs/js/custom_element/getCustomTagName");
const {replaceInFile} = require("../../../libs/js/custom_element/replaceInFile");
const {deleteFileSync} = require("../../../libs/js/custom_element/deleteFileSync");
const {deleteFileLineBy} = require("../../../libs/js/custom_element/deleteFileLineBy");
const {registerCustomElement} = require("../../../libs/js/custom_element/registerCustomElement");
const {addFileLineAfter} = require("../../../libs/js/custom_element/addFileLineAfter");
const {getCSSPath} = require("../buildTemplateHandler/utils");
const processCssFileSync = require("../../../libs/js/custom_element/processCssFileSync");
const {htmlTemplates} = require("../buildOptions/templateOptions");
const {getStringFromFile} = require("../../../libs/js/custom_element/getStringFromFile");

// Paths to the directories
const distributionPath = path.join(__dirname, "../distribution");
const indexTs = path.join(distributionPath, "/index.ts");
const srcPath = path.join(__dirname, "../src");
const settingsDirPath = path.join(distributionPath, "/settings");
const infoFilePath = path.join(settingsDirPath, "/info.ts");
const modulesPath = path.join(settingsDirPath, "/modules.ts");
const HTMLTemplatesDirPath = path.join(distributionPath,"/modules/elements");
const templatesMarkers = htmlTemplates;

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
    "START_ROUTES_REGISTRATION()",
    "APP_TAG_NAME",
]);

const tagLines = getSubstringFromFile(modulesPath, "getOption(", "),")
const tagReplacements = getTagReplacements(tagLines);
replaceInFile(
    modulesPath,
    tagReplacements
);

const cssTag = processCssFileSync(getCSSPath(),tagReplacements);
addFileLineAfter(
    modulesPath,
    [
        {
            target: "export const MODULES:",
            line: `    getOption(AppRoot, "${customElementTagName}", "${cssTag} APP_EXAMPLE_____ROOT", true),`,
        }
    ]);

replaceInFile(
    modulesPath,
    [
        {target: "MODULES", replacer: `CSM_${customElementName.toUpperCase()}`},
    ]);

deleteFileSync(indexTs);

registerCustomElement({
    name: customElementTagName,
    version: customElementVersion,
    destination: `../../../../custom_elements/${customElementName}/distribution/settings/modules`,
    description: "Custom element for sharing"
});

function fillModuleTemplates() {
    const templateReplacements = [];

    for (const templateMarker in templatesMarkers) {
        const fileNamePath = templatesMarkers[templateMarker];
        const templatePath = path.join(HTMLTemplatesDirPath, fileNamePath);
        let bodyStr = getStringFromFile(templatePath);

        templateReplacements.push({
            target: templateMarker,
            replacer: bodyStr
        });
    }

    replaceInFile(
        modulesPath,
        templateReplacements
    );
}

function getTagNameFromLine(line) {
    const words = line.split(",");
    if (words.length < 2) return "";
    return line.split(",")[1].trim().split('"').join("").split("'").join("");
}

function getTagReplacements(tagLines) {
    const replacements = [];
    const prefix = customElementTagName.split("-").join("");
    replacements.push(
        {target: "CSM", replacer: prefix},
    );

    for (const tagLine of tagLines) {
        const tagName = getTagNameFromLine(tagLine);

        const suffix = tagName.split("app-").join("").split("-").join("");
        replacements.push({
            target: tagName,
            replacer: `${prefix}-${suffix}`
        });
    }
    return replacements;
}

function updateTagReplacements() {
    const len = tagReplacements.length;
    const newReplacements = [];
    for (let i = 0; i < len; i++) {
        const replacement = tagReplacements.pop();
        newReplacements.push({
            target: `<${replacement.target}`,
            replacer: `<${replacement.replacer}`
        });
        newReplacements.push({
            target: `</${replacement.target}`,
            replacer: `</${replacement.replacer}`
        });
    }

    tagReplacements.push(...newReplacements);
}

fillModuleTemplates();
updateTagReplacements();

replaceInFile(
    modulesPath,
    tagReplacements
);