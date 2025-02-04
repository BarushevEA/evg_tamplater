const fs = require('fs');
const path = require('path');

/**
 * Deletes a folder synchronously at a given path, including all its content.
 * @param {string} folderPath - The path to the folder to be deleted.
 */
exports.deleteFolderSync = (folderPath) => {
    try {
        if (fs.existsSync(folderPath)) {
            fs.rmSync(folderPath, { recursive: true, force: true });
            console.log(`Folder ${folderPath} was successfully deleted.`);
        } else {
            console.log(`Folder ${folderPath} does not exist.`);
        }
    } catch (err) {
        console.error(`Error while deleting folder: ${err.message}`);
    }
};