const fs = require('fs');

/**
 * Checks if a file contains a specific string.
 * @param {string} filePath - The path to the file.
 * @param {string} str - The string to search for.
 * @returns {boolean} - True if the file contains the string, false otherwise.
 */
exports.isFileContained = (filePath, str) => {
    try {
        // Read the file content as a string
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // Check if the string is present in the file
        return fileContent.includes(str);
    } catch (err) {
        console.error(`Error reading the file: ${err.message}`);
        return false; // Return false if an error occurred (e.g., file not found)
    }
};