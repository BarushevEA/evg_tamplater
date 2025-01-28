const path = require("path");
const {copySrcToDistribution} = require("../../../libs/js/custom_element/copySrcToDistribution");
const {getSubstringFromFile} = require("../../../libs/js/custom_element/getSubstringFromFile");
const {getCustomTagName} = require("../../../libs/js/custom_element/getCustomTagName");
const {replaceInFile} = require("../../../libs/js/custom_element/replaceInFile");

// Paths to the directories
const distributionPath = path.join(__dirname, "../distribution");
const srcPath = path.join(__dirname, "../src");
const settingsDirPath = path.join(distributionPath, "/settings");
const infoFilePath = path.join(settingsDirPath, "/info.ts");
const modulesPath = path.join(settingsDirPath, "/modules.ts");

copySrcToDistribution(srcPath, distributionPath);

const customElementName = getSubstringFromFile(infoFilePath, "AppInfo('", "'")[0];
const customElementTagName = customElementName ? getCustomTagName(customElementName) : "";

console.log(`Custom element name: ${customElementName}`);
console.log(`Custom element tag name: ${customElementTagName}`);

replaceInFile(
    modulesPath,
    [
        {
            target: `\nimport {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";`,
            replacer: ""
        },
        {
            target: `\nimport {START_ROUTES_REGISTRATION} from "./routes";`,
            replacer: ""
        },
        {target: "\nSTART_ROUTES_REGISTRATION();", replacer: ""},
        {target: "MODULES", replacer: `CSM_${customElementName.toUpperCase()}`},
        {target: "APP_TAG_NAME", replacer: `"${customElementTagName}"`}
    ]);
