const fs = require("fs");
const {csmRegPath} = require("./env");

/**
 * Adds or updates the registration of a custom element in the csmReg.json file.
 * @param {Object} meta
 * {
 *   name: "CustomName1",
 *   version: "0.0.0",
 *   destination: "./custom/element/path1",
 *   description: "Custom element for sharing"
 * }
 */
exports.registerCustomElement = (meta) => {
    const filePath = csmRegPath

    console.log("registerCustomElement",filePath);

    // Check if the file exists
    let registry = {};
    if (fs.existsSync(filePath)) {
        try {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            registry = JSON.parse(fileContent); // Load data from the existing file
        } catch (err) {
            console.error("Error reading the JSON file:", err);
            return;
        }
    }

    // Validate that all required fields are present in meta
    const requiredFields = ["name", "version", "destination", "description"];
    const missingFields = requiredFields.filter(field => !(field in meta));
    if (missingFields.length > 0) {
        console.error("Error: Missing the following required fields in meta:", missingFields.join(", "));
        return;
    }

    // Update or add the element
    registry[meta.name] = {
        version: meta.version,
        destination: meta.destination,
        description: meta.description,
    };

    // Write the updated data back to the file
    try {
        fs.writeFileSync(filePath, JSON.stringify(registry, null, 2), "utf-8");
        console.log(`Element "${meta.name}" has been successfully registered in csmReg.json.`);
    } catch (err) {
        console.error("Error writing to csmReg.json:", err);
    }
}