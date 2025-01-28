const fs = require("fs");
const path = require("path");

exports.copySrcToDistribution = function(srcPath, distributionPath) {
    // Function to delete all files and directories inside a given directory
    function clearDirectory(directoryPath) {
        if (fs.existsSync(directoryPath)) {
            const files = fs.readdirSync(directoryPath);
            for (const file of files) {
                const filePath = path.join(directoryPath, file);
                if (fs.lstatSync(filePath).isDirectory()) {
                    fs.rmSync(filePath, { recursive: true, force: true });
                } else {
                    fs.unlinkSync(filePath);
                }
            }
        }
    }

// Function to copy the contents of one directory to another
    function copyDirectory(src, dest) {
        fs.mkdirSync(dest, { recursive: true });
        const files = fs.readdirSync(src);

        for (const file of files) {
            const srcFile = path.join(src, file);
            const destFile = path.join(dest, file);

            if (fs.lstatSync(srcFile).isDirectory()) {
                copyDirectory(srcFile, destFile);
            } else {
                fs.copyFileSync(srcFile, destFile);
            }
        }
    }

// Main logic
    if (fs.existsSync(distributionPath)) {
        // If the distribution folder exists, clear its contents
        console.log("Directory 'distribution' found. Clearing its contents...");
        clearDirectory(distributionPath);
    } else {
        // If the distribution folder does not exist, create it
        console.log("Directory 'distribution' not found. Creating it...");
        fs.mkdirSync(distributionPath, { recursive: true });
    }

// Copy contents of the src folder to the distribution folder
    console.log("Copying contents of 'src' to 'distribution'...");
    copyDirectory(srcPath, distributionPath);

    console.log("Done!");
}