const fs = require("fs");
const readline = require("readline");
const {csmRegPath} = require("./env");

/**
 * Prompts the user to select a custom element from csmReg.json
 * @returns {Object|null} Selected element metadata or null if exited
 */
exports.selectCustomElement = async () => {
    const filePath = csmRegPath

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        console.error("Error: csmReg.json file does not exist.");
        return null;
    }

    // Read and parse the JSON file
    let registry;
    try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        registry = JSON.parse(fileContent);
    } catch (err) {
        console.error("Error reading or parsing csmReg.json:", err);
        return null;
    }

    // Get and display the list of custom element names
    const elementNames = Object.keys(registry);
    if (elementNames.length === 0) {
        console.log("No custom elements are registered in csmReg.json.");
        return null;
    }

    console.log("Select an element:");
    console.log("0) Exit");
    elementNames.forEach((name, index) => {
        console.log(`${index + 1}) ${name}`);
    });

    // Prompt the user for their selection
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const userInput = await new Promise((resolve) =>
        rl.question("Enter the number of your choice: ", (answer) => {
            rl.close();
            resolve(answer);
        })
    );

    const choice = parseInt(userInput.trim(), 10);

    // Validate the user's choice
    if (isNaN(choice) || choice < 0 || choice > elementNames.length) {
        console.error("Invalid selection. Please enter a valid number.");
        return null;
    }

    // Return null if the user chooses 0 (Exit)
    if (choice === 0) {
        return null;
    }

    // Retrieve and return the selected element's metadata
    const selectedElementName = elementNames[choice - 1];
    const selectedElementMeta = registry[selectedElementName];

    // Include the name explicitly in the returned metadata
    return {
        name: selectedElementName,
        ...selectedElementMeta,
    };
}
