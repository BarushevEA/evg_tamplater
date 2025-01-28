const fs = require('fs');

/**
 * Deletes a file synchronously at a given path.
 * @param {string} filePath - The path to the file to be deleted.
 */
exports.deleteFileSync = (filePath) => {
    try {
        fs.unlinkSync(filePath);
        console.log(`File ${filePath} was successfully deleted.`);
    } catch (err) {
        console.error(`Error while deleting file: ${err.message}`);
    }
}
