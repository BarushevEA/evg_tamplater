const fs = require('fs');
const path = require('path');

/**
 * Copies the content of one folder to another folder synchronously.
 * @param {string} srcFolder - The source folder path.
 * @param {string} destFolder - The destination folder path.
 */
exports.copyFolderSync = (srcFolder, destFolder) => {
    try {
        if (!fs.existsSync(srcFolder)) {
            throw new Error(`Source folder ${srcFolder} does not exist.`);
        }

        if (!fs.existsSync(destFolder)) {
            fs.mkdirSync(destFolder, { recursive: true });
        }

        // Read all items (files and folders) inside the source folder
        const items = fs.readdirSync(srcFolder);

        for (const item of items) {
            const srcPath = path.join(srcFolder, item);
            const destPath = path.join(destFolder, item);

            // Check if it's a directory or a file
            const stats = fs.statSync(srcPath);

            if (stats.isDirectory()) {
                // Recursively copy the folder
                exports.copyFolderSync(srcPath, destPath);
            } else {
                // Copy the file
                fs.copyFileSync(srcPath, destPath);
            }
        }

        console.log(`Contents of '${srcFolder}' successfully copied to '${destFolder}'.`);
    } catch (err) {
        console.error(`Error while copying folder: ${err.message}`);
    }
};