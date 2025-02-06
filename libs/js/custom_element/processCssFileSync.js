const fs = require('fs');
const path = require('path');

/**
 * Synchronously reads a CSS file, performs transformations, and returns its content as a string
 * @param {string} filePath - Path to the CSS file
 * @returns {string} - Transformed CSS file content
 */
function processCssFileSync(filePath, tagReplacements) {
    try {
        const cssIgnoreElement = "{display: contents !important;}";
        let cssIgnore = "txt-val{display: contents !important;}qsi-bind{display: contents !important;}qsi-subroute{display: contents !important;}";

        for (let i = 0; i < tagReplacements.length; i++) {
            const tagReplacement = tagReplacements[i];
            cssIgnore += `${tagReplacement.replacer}${cssIgnoreElement}`;
        }

        // Synchronously read the file content
        const cssFileStr = fs.readFileSync(path.resolve(filePath), 'utf-8');

        // Perform the required transformations
        let result = cssFileStr.replaceAll("/*# sourceMappingURL=style.css.map */", "")
            .replaceAll("\r", "")
            .replaceAll("\n", "")
            .replaceAll("  ", "")
            .replaceAll(" {", "{")
            .replaceAll("\"", "'");

        return `<style>${cssIgnore}${result}</style>`;
    } catch (error) {
        console.error("Error processing the file:", error.message);
        return "";
    }
}

module.exports = processCssFileSync;
