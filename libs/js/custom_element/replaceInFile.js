const fs = require("fs");

exports.replaceInFile = (filePath, replacements) => {
    try {
        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return;
        }

        // Read the file content
        let fileContent = fs.readFileSync(filePath, "utf-8");

        // Process the replacements array
        for (const {target, replacer} of replacements) {
            if (typeof target !== "string" || typeof replacer !== "string") {
                console.error(`Invalid replacement object: { target: ${target}, replacer: ${replacer} }`);
                continue;
            }

            // Escape target for use in regex
            const escapedTarget = escapeRegExp(target);

            // Replace all occurrences of target with replacer
            const regex = new RegExp(escapedTarget, "g"); // Global search
            fileContent = fileContent.replace(regex, replacer);
        }

        // Write the updated content back to the file
        fs.writeFileSync(filePath, fileContent, "utf-8");
        console.log(`File updated successfully: ${filePath}`);
    } catch (error) {
        // Handle errors and log the message
        console.error(`An error occurred while processing the file: ${error.message}`);
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
