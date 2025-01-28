const fs = require("fs");

exports.getSubstringFromFile = (filePath, startDelimiter, endDelimiter) => {
    try {
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return [];
        }

        const fileContent = fs.readFileSync(filePath, "utf-8");
        const result = [];
        let startIndex = 0;

        while (true) {
            // Find the start and end positions of the substring
            startIndex = fileContent.indexOf(startDelimiter, startIndex);
            if (startIndex === -1) break; // No more delimiters found
            startIndex += startDelimiter.length;

            const endIndex = fileContent.indexOf(endDelimiter, startIndex);
            if (endIndex === -1) break; // No ending delimiter found

            // Extract the substring and push it into the result array
            const substring = fileContent.substring(startIndex, endIndex);
            result.push(substring.trim()); // Trimming whitespaces (if any)

            // Move the search index forward
            startIndex = endIndex + endDelimiter.length;
        }

        return result.length > 0 ? result : [];
    } catch (error) {
        console.error(`An error occurred while processing the file: ${error.message}`);
        return [];
    }
}