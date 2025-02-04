const {selectCustomElement} = require("../../libs/js/custom_element/selectCustomElement");
const {addFileLineAfter} = require("../../libs/js/custom_element/addFileLineAfter");
const path = require("node:path");
const {deleteFileLineBy} = require("../../libs/js/custom_element/deleteFileLineBy");
const {copyFolderSync} = require("../../libs/js/custom_element/copyFolderSync");
const {isFileContained} = require("../../libs/js/custom_element/isFileContained");

const flagsJsPath = path.join(__dirname, "buildOptions/flags.js");
deleteFileLineBy(flagsJsPath, [
    "isCssEncrypt",
    "isJsCssProcess",
]);

addFileLineAfter(flagsJsPath, [
    {
        target: "exports.flag",
        line: "    isCssEncrypt: false,",
    },
]);

addFileLineAfter(flagsJsPath, [
    {
        target: "isCssEncrypt",
        line: "    isJsCssProcess: false,",
    },
]);

function removePathPart(fullPath, partToRemove) {
    const normalizedPath = path.normalize(fullPath); // Normalize the path for consistency
    const index = normalizedPath.indexOf(partToRemove);

    if (index !== -1) {
        // Remove the specified portion starting from its index
        return normalizedPath.slice(0, index).replace(/[\\/]$/, ''); // Remove trailing "/" or "\" if present
    }

    // Return the original path if the part to remove is not found
    return normalizedPath;
}


async function addCustomElement() {
    const element = await selectCustomElement()

    if (!element) return;

    const moduleName = getModuleName(element.name);
    const assetsPath = path.join(__dirname, "src/modules/css/assets");
    const modulesPath = path.join(__dirname, "src/settings/modules.ts");
    const distributionPathDirty = removePathPart(element.destination, "settings/modules");
    const distributionPath = path.normalize("../../" + distributionPathDirty.split("../../../../").join(""));
    const distributionAssetsPath = path.join(distributionPath, "/modules/css/assets");

    if (isFileContained(modulesPath, moduleName)) {
        console.log(`Module ${moduleName} already exists.`);
        return;
    }

    addFileLineAfter(
        modulesPath,
        [
            {
                line: `import {${moduleName}} from "${element.destination}";`,
            },
            {
                target: "export const MODULES:",
                line: `    ...${moduleName},`,
            }
        ]
    );

    copyFolderSync(distributionAssetsPath, assetsPath);
}

function getModuleName(tagName) {
    const tagNameSplit = tagName.split("-");
    return tagNameSplit.join("_").toUpperCase();
}

addCustomElement().catch(err => console.error(err));