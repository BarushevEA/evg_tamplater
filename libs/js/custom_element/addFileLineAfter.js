const fs = require("fs");

/**
 * Inserts lines into a file based on specified criteria.
 * @param {string} filePath - The path to the file to process.
 * @param {Array} insertions - An array of objects with `target` and `line` properties.
 *                              - `target`: If empty, the line is inserted at the beginning of the file.
 *                              - `line`: The line to insert (will include a newline character).
 */
function addFileLineAfter(filePath, insertions) {
    try {
        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return;
        }

        // Read the file content
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const lines = fileContent.split("\n"); // Split content into lines

        // Process each insertion
        insertions.forEach(({ target = "", line }) => {
            // If target is empty, insert at the beginning
            if (!target) {
                lines.unshift(line); // Add at the start
                return; // Move to the next insertion
            }

            // Find the index of the line containing the target
            const index = lines.findIndex(existingLine => existingLine.includes(target));

            if (index !== -1) {
                // Insert after the found line
                lines.splice(index + 1, 0, line);
            } else {
                console.warn(`Target string "${target}" not found in file. Skipping insertion for line "${line}".`);
            }
        });

        // Write the updated content back to the file
        fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
        console.log(`Lines were inserted successfully into ${filePath}`);
    } catch (error) {
        // Handle errors
        console.error(`An error occurred while processing the file: ${error.message}`);
    }
}

module.exports = { addFileLineAfter };