const fs = require("fs");

/**
 * Deletes all lines in a file that contain any of the specified substrings.
 * @param {string} filePath - The path to the file to process.
 * @param {string[]|string} substrings - The substrings to search for in lines to be removed.
 */
exports.deleteFileLineBy = (filePath, substrings) => {
    try {
        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return;
        }

        // Normalize substrings into an array, in case it's a single string
        const patterns = Array.isArray(substrings) ? substrings : [substrings];

        // Read the file content
        const fileContent = fs.readFileSync(filePath, "utf-8");

        // Split the file content into lines and filter out lines containing any of the substrings
        const updatedContent = fileContent
            .split("\n") // Split into lines
            .filter(line =>
                !patterns.some(substring => line.includes(substring)) // Remove lines with any substring
            )
            .join("\n"); // Join back into a single string

        // Write the updated content back to the file
        fs.writeFileSync(filePath, updatedContent, "utf-8");
        console.log(`Lines containing the specified substrings were deleted successfully from ${filePath}`);
    } catch (error) {
        // Handle errors
        console.error(`An error occurred while processing the file: ${error.message}`);
    }
};