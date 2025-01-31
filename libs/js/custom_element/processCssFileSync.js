const fs = require('fs');
const path = require('path');

/**
 * Synchronously reads a CSS file, performs transformations, and returns its content as a string
 * @param {string} filePath - Path to the CSS file
 * @returns {string} - Transformed CSS file content
 */
function processCssFileSync(filePath) {
    try {
        // Synchronously read the file content
        const cssFileStr = fs.readFileSync(path.resolve(filePath), 'utf-8');

        // Perform the required transformations
        let result = cssFileStr.replaceAll("/*# sourceMappingURL=style.css.map */", "")
            .replaceAll("\r", "")
            .replaceAll("\n", "")
            .replaceAll("  ", "")
            .replaceAll("\"", "'");

        return `<style>${result}</style>`;
    } catch (error) {
        console.error("Error processing the file:", error.message);
        return "";
    }
}

module.exports = processCssFileSync;
