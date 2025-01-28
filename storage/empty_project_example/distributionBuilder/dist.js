const path = require("path");
const {copySrcToDistribution} = require("../../../libs/js/custom_element/copySrcToDistribution");
const {getSubstringFromFile} = require("../../../libs/js/custom_element/getSubstringFromFile");
const {getCustomTagName} = require("../../../libs/js/custom_element/getCustomTagName");

// Paths to the directories
const distributionPath = path.join(__dirname, "../distribution");
const srcPath = path.join(__dirname, "../src");
const infoFilePath = path.join(distributionPath, "/settings/info.ts");

copySrcToDistribution(srcPath, distributionPath);

const customElementName = getSubstringFromFile(infoFilePath, "AppInfo('", "'");
const customElementTagName = customElementName.length ? getCustomTagName(customElementName[0]) : "";

console.log(`Custom element name: ${customElementName}`);
console.log(`Custom element tag name: ${customElementTagName}`);
