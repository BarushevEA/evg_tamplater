const {selectCustomElement} = require("../../libs/js/custom_element/selectCustomElement");
const {addFileLineAfter} = require("../../libs/js/custom_element/addFileLineAfter");
const path = require("node:path");

async function addCustomElement() {
    const element = await selectCustomElement()

    if (!element) return;

    const modulesPath = path.join(__dirname, "src/settings/modules.ts");
    const moduleName = getModuleName(element.name);

    addFileLineAfter(
        modulesPath,
        [
            {
                line: `import {${moduleName}} from "${element.destination}";`,
            },
            {
                target:"export const MODULES:",
                line: `    ...${moduleName},`,
            }
        ]
    );
}

function getModuleName(tagName){
    const tagNameSplit = tagName.split("-");
    return tagNameSplit.join("_").toUpperCase();
}

addCustomElement().catch(err => console.error(err));