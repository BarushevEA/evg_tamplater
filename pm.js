#!/usr/bin/env node

const path = require("path");
const {cpSync} = require("fs");
const fs = require("fs");
const {askQuestion, askQuestionClose, normalizeName} = require("./consoleHelper");
const {deleteFolderSync} = require("./libs/js/custom_element/deleteFolderSync");
const {deleteFileLineBy} = require("./libs/js/custom_element/deleteFileLineBy");

/**
 * Represents a command used in the application.
 *
 * @readonly
 * @enum {string}
 */
const COMMAND = {
    CREATE_PROJECT: "p",
    CREATE_CUSTOM_ELEMENT: "cstm",
    CREATE_STEP_BY_STEP: "sbs",
};

/**
 * Represents the command received from the command-line arguments.
 *
 * @type {string}
 * @memberOf global
 */
let cmdCommand = process.argv[2];
/**
 * Represents the name of the new project.
 *
 * @type {string}
 * @description The value of this variable is obtained from the command line argument at index 3 (process.argv[3]).
 *              It is used to store the name of the new project.
 */
let newProjectName = process.argv[3];

/**
 * Represents the name of an empty project.
 *
 * @type {string}
 */
const emptyProjectName = "empty_project_example";
/**
 * Creates a project path for an empty project.
 *
 * @type {string}
 */
const emptyProjectPath = path.join(__dirname, "storage", emptyProjectName);

async function handleCommand() {
    try {
        let isStep2 = false;

        if (cmdCommand === COMMAND.CREATE_STEP_BY_STEP || !cmdCommand) {
            const mode = await askQuestion("Choose mode: \n1. Create project\n2. Create custom element\n3. Exit\n");
            if (mode === "1" || !mode) {
                cmdCommand = COMMAND.CREATE_PROJECT;
                isStep2 = true;
            } else if (mode === "2") {
                cmdCommand = COMMAND.CREATE_CUSTOM_ELEMENT;
                isStep2 = true;
            } else if (mode === "3") {
                process.exit(0);
            } else {
                console.log("Invalid mode");
                process.exit(0);
            }
        }

        if (isStep2 && cmdCommand === COMMAND.CREATE_PROJECT) {
            newProjectName = await askQuestion("Enter project name: ");
            newProjectName = normalizeName(newProjectName);
        } else if (isStep2 && cmdCommand === COMMAND.CREATE_CUSTOM_ELEMENT) {
            newProjectName = await askQuestion("Enter custom element name: ");
            newProjectName = normalizeName(newProjectName);
            newProjectName = `${newProjectName}`;
        }

        console.log("PROJECT NAME:", newProjectName);
    } catch (error) {
        console.log("ERROR:", error);
    } finally {
        askQuestionClose();
        createProject();
    }
}

handleCommand();

function createProject() {
    /**
     * The destination path for the project.
     *
     * @type {string}
     */
    const destinationProjectPath = getDestinationProjectPath();

    function getDestinationProjectPath() {
        switch (cmdCommand) {
            case COMMAND.CREATE_PROJECT:
                return path.join(process.cwd(), "app", newProjectName);
            case COMMAND.CREATE_CUSTOM_ELEMENT:
                return path.join(process.cwd(), "custom_elements", newProjectName);
            default:
                return path.join(process.cwd(), "app", newProjectName);
        }
    }

    /**
     * The buildOptionsProjectPath represents the file path of the 'appPath.js' within
     * the 'buildOptions' directory of a destination project.
     *
     * @type {string}
     * @memberof module:yourModuleName
     * @see {@link module:yourModuleName}
     * @example
     * // Usage
     * const buildOptionsProjectPath = path.join(destinationProjectPath,"buildOptions","appPath.js");
     */
    const buildOptionsProjectPath = path.join(destinationProjectPath, "buildOptions", "appPath.js");
    /**
     * Represents the path to the `package.json` file in a project
     *
     * @type {string}
     *
     * @param {string} destinationProjectPath - The path to the project directory
     *
     * @returns {string} The complete path to the `package.json` file
     */
    const packageJsonProjectPath = path.join(destinationProjectPath, "package.json");
    /**
     * Represents the path to the settings info file of a project.
     *
     * @type {string}
     */
    const settingsProjectPath = path.join(destinationProjectPath, "src", "settings", "info.ts");

    handleArguments();

    /**
     * Handles the arguments for creating a new project.
     *
     * @param {string} cmdCommand - The command to create a new project.
     * @param {string} newProjectName - The name of the new project.
     * @param {string} emptyProjectPath - The path of the empty project template.
     * @param {string} destinationProjectPath - The path where the new project will be created.
     *
     * @return {void} This method does not return anything.
     */
    function handleArguments() {
        let isProcessing = false;
        switch (cmdCommand) {
            case COMMAND.CREATE_PROJECT:
            case COMMAND.CREATE_CUSTOM_ELEMENT:
                isProcessing = true;
                break;
            default:
                isProcessing = false;
        }

        if (!isProcessing) return;
        if (!newProjectName) return;
        console.log("START");

        cpSync(emptyProjectPath, destinationProjectPath, {recursive: true});

        handleBuildOptions();
        handlePackageJson();
        handleProjectSettings();

        console.log("FINISH");
    }

    /**
     * Handle the build options by reading the build options project file,
     * replacing the empty project name with the new project name, and
     * writing the modified content back to the build options project file.
     *
     * @returns {void}
     */
    function handleBuildOptions() {
        fs.readFile(buildOptionsProjectPath, (error, data) => {
            handleError(error);

            let jsFileStr = data.toString();
            jsFileStr = jsFileStr.replaceAll(emptyProjectName, newProjectName);

            fs.writeFile(buildOptionsProjectPath, jsFileStr, (error) => handleError(error));
        });
    }

    /**
     * Reads the contents of the package.json file located at the given project path,
     * replaces any occurrence of the empty project name with the new project name,
     * and then writes back the modified contents to the package.json file.
     *
     * @returns {void}
     */
    function handlePackageJson() {
        fs.readFile(packageJsonProjectPath, (error, data) => {
            handleError(error);

            let jsFileStr = data.toString();
            jsFileStr = jsFileStr.replaceAll(emptyProjectName, newProjectName);

            fs.writeFile(packageJsonProjectPath, jsFileStr, (error) => handleError(error));
        });
    }

    /**
     * Handles project settings.
     *
     * This method reads the content of the project settings file, replaces the empty project name with the new project name,
     * and writes the modified content back to the settings file.
     *
     * @returns {void}
     */
    function handleProjectSettings() {
        fs.readFile(settingsProjectPath, (error, data) => {
            handleError(error);

            let jsFileStr = data.toString();
            jsFileStr = jsFileStr.replaceAll(emptyProjectName, newProjectName);

            fs.writeFile(settingsProjectPath, jsFileStr, (error) => handleError(error));
        });
    }

    /**
     * Handles the given error.
     * @param {Error} error - The error to handle.
     * @throws {Error} - If the error parameter is truthy.
     */
    function handleError(error) {
        if (error) throw error;
    }

    if (cmdCommand === COMMAND.CREATE_PROJECT) {
        const distributionBuilderPath = path.join(destinationProjectPath, "distributionBuilder");
        deleteFolderSync(distributionBuilderPath);

        const packageJsonPath = path.join(destinationProjectPath, "package.json");
        deleteFileLineBy(packageJsonPath, ['"customElementDist"']);
    }
}
