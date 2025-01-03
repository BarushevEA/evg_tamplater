const path = require("path");
const {getTemplatePath, getModulesPath} = require("./buildTemplateHandler/utils");
const fs = require("fs");
const {askQuestionClose, askQuestion, normalizeName, normalizeComponentName} = require("../../consoleHelper");
/**
 * Enum representing possible commands.
 * @enum {string}
 */
const COMMAND = {
    CREATE_COMPONENT: "c",
    COMPONENT_DIR: "d",
    CREATE_STEP_BY_STEP: "sbs",
};

/**
 * Specifies the prefix used for marker strings in the application.
 *
 * @type {string}
 * @constant
 */
const markerPrefix = "APP_EXAMPLE_____MARKER_";
/**
 * The tagPrefix variable represents the prefix used for custom HTML tags in an application.
 *
 * @type {string}
 */
const tagPrefix = "app-";
/**
 * The path to the template options file.
 *
 * @type {string}
 * @example
 * const templateOptionsPath = path.join(__dirname, "buildOptions", "templateOptions.js");
 */
const templateOptionsPath = path.join(__dirname, "buildOptions", "templateOptions.js");
/**
 * Function to get the path of the modules.
 *
 * @returns {string} The path of the modules.
 */
const modulesPath = getModulesPath();

/**
 * Represents the command entered as a command line argument.
 *
 * @type {string}
 */
let cmdCommand = process.argv[2];
/**
 * Represents the name of a new component.
 *
 * @type {string}
 */
let newComponentName = process.argv[3];

/**
 * Represents the directory path provided as a command line argument.
 *
 * @type {string}
 * @name cmdDir
 * @description The value of this variable is extracted from the command line arguments list using process.argv[4].
 *              It should be a string representing the directory path passed as a command line argument.
 */
let cmdDir = process.argv[4];
/**
 * Represents the command line argument for the new directory.
 *
 * @type {string}
 */
let newDir = process.argv[5];

/**
 * Custom directory path.
 *
 * @type {string}
 */
let customDir = "";

async function handleCommand() {
    const handleCmd = async () => {
        let isDir = false;

        let action = await askQuestion(
            "Choose action:\n1. Enter component name\n2. Enter component name with dir\n3. Exit\n"
        );

        switch (action) {
            case "":
                action = await askQuestion("Component name:\n");
                cmdCommand = COMMAND.CREATE_COMPONENT;
                newComponentName = normalizeComponentName(action)
                break
            case "1":
                action = await askQuestion("Component name:\n");
                cmdCommand = COMMAND.CREATE_COMPONENT;
                newComponentName = normalizeComponentName(action)
                break;
            case "2":
                action = await askQuestion("Component name:\n");
                cmdCommand = COMMAND.CREATE_COMPONENT;
                newComponentName = normalizeComponentName(action)
                isDir = true
                break;
            case "3":
                process.exit(0);
                break
            default:
        }

        return isDir
    }
    const handleDir = async () => {
        let action = await askQuestion(
            "Choose action:\n1. Default component dir\n2. Enter component dir\n3. Exit\n"
        );

        switch (action) {
            case "":
                cmdDir = ""
                newDir = ""
                break
            case "1":
                cmdDir = ""
                newDir = ""
                break;
            case "2":
                action = await askQuestion("component dir:\n");
                cmdDir = COMMAND.COMPONENT_DIR;
                newDir = normalizeName(action)
                break;
            case "3":
                process.exit(0);
                break
            default:
        }
    }

    try {
        if (cmdCommand == COMMAND.CREATE_STEP_BY_STEP || !cmdCommand) {
            if (await handleCmd()) await handleDir();
        }
    } catch (error) {
        console.log("ERROR:", error);
    } finally {
        askQuestionClose();
        handleArguments();
    }
}

handleCommand();

/**
 * Represents a Maker object which is responsible for creating component templates and registering them in the module.
 */
class Maker {
    marker
    tag
    pathPart
    dir
    absoluteDirPath
    tsFileName
    htmlFileName
    scssMixinFileName
    componentTsPath
    componentHtmlPath
    componentScssMixinPath
    absoluteComponentTsPath
    absoluteComponentHtmlPath
    absoluteComponentScssMixinPath
    htmlTemplate
    tsTemplate
    scssMixinTemplate
    componentClassName

    modulesImportString
    modulesImportStringDecorated

    constructor() {
        this.marker = markerPrefix + newComponentName.toUpperCase();
        this.pathPart = newComponentName.toLowerCase();
        this.tag = tagPrefix + this.pathPart;
        this.dir = path.join(customDir, this.pathPart);
        this.tsFileName = `${this.pathPart}.ts`;
        this.htmlFileName = `${this.pathPart}.html`;
        this.scssMixinFileName = `_${this.pathPart}.scss`;
        this.componentTsPath = path.join(this.dir, this.tsFileName);
        this.componentHtmlPath = path.join(this.dir, this.htmlFileName);
        this.componentScssMixinPath = path.join(this.dir, this.scssMixinFileName);
        this.absoluteDirPath = getTemplatePath(this.dir);
        this.absoluteComponentTsPath = getTemplatePath(this.componentTsPath);
        this.absoluteComponentHtmlPath = getTemplatePath(this.componentHtmlPath);
        this.absoluteComponentScssMixinPath = getTemplatePath(this.componentScssMixinPath);
        this.componentClassName = `${this.pathPart[0].toUpperCase()}${this.pathPart.substring(1)}`
        this.modulesImportString = `import {${this.componentClassName}} from "../modules/elements/${this.dir}/${this.pathPart}";`;
        this.modulesImportStringDecorated = `${this.modulesImportString}\n`;

        this.registerOnTemplateOptions();
    }

    createTemplates() {
        const additionalLevel = "../";
        let levels = "";

        for (let i = 0; i < this.dir.length; i++) {
            const smb = this.dir[i];
            if (smb === "/") {
                levels += additionalLevel;
            }
        }

        this.htmlTemplate = `<div>Hello ${this.htmlFileName}</div>`;
        this.tsTemplate = `
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../${levels}libs/env/types";
import {log} from "../../../../../../${levels}libs/utils/utils";

export class ${this.componentClassName} implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }
    
    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}`;
        this.scssMixinTemplate = `
@mixin ${this.pathPart}() {
}
        `;
        fs.mkdirSync(this.absoluteDirPath);
        fs.writeFile(this.absoluteComponentTsPath, this.tsTemplate, (error) => handleError(error));
        fs.writeFile(this.absoluteComponentHtmlPath, this.htmlTemplate, (error) => handleError(error));
        fs.writeFile(this.absoluteComponentScssMixinPath, this.scssMixinTemplate, (error) => handleError(error));
    }

    registerOnTemplateOptions() {
        const newTemplate = `"${this.marker}": "${this.componentHtmlPath}",`;
        const newTemplateDecorated = `    ${newTemplate}\n};`;

        fs.readFile(templateOptionsPath, (error, data) => {
            handleError(error);

            let jsFileStr = data.toString();

            if (jsFileStr.includes(newTemplate)) return;

            jsFileStr = jsFileStr.replace("};", newTemplateDecorated);

            fs.writeFile(templateOptionsPath, jsFileStr, (error) => handleError(error));

            this.createTemplates();
            this.registerOnModules();
        });
    }

    registerOnModules() {
        const newTemplate = `getOption(${this.componentClassName}, "${this.tag}", "${this.marker}"),`;
        const newTemplateDecorated = `    ${newTemplate}\n];`;

        fs.readFile(modulesPath, (error, data) => {
            handleError(error);

            let jsFileStr = data.toString();

            if (jsFileStr.includes(newTemplate)) return;

            jsFileStr = this.modulesImportStringDecorated + jsFileStr;

            jsFileStr = jsFileStr.replace("];", newTemplateDecorated);

            fs.writeFile(modulesPath, jsFileStr, (error) => handleError(error));
        });
    }
}

/**
 * Handles the arguments passed to a command.
 * If the command is not CREATE_COMPONENT or the newComponentName is not provided,
 * the function does nothing.
 * If the command directory is COMPONENT_DIR and a new directory is specified,
 * the customDir is set to the new directory path.
 * The function logs information about the command, newComponentName,
 * modulesPath, templateOptionsPath, variables, and the start and end of the execution.
 *
 * @param {string} cmdCommand - The command being executed.
 * @param {string} newComponentName - The name of the new component being created.
 * @param {string} cmdDir - The command directory.
 * @param {string} newDir - The new directory path (optional).
 * @param {string} modulesPath - The path to the modules.
 * @param {string} templateOptionsPath - The path to the template options.
 *
 * @return {void}
 */
function handleArguments() {
    if (cmdCommand !== COMMAND.CREATE_COMPONENT) return;
    if (!newComponentName) return;
    if (cmdDir === COMMAND.COMPONENT_DIR) customDir = newDir ? newDir : "";

    console.log("START");
    console.log();

    console.log(`cmdCommand: ${cmdCommand}`);
    console.log(`newComponentName: ${newComponentName}`);
    console.log(`modulesPath: ${modulesPath}`);
    console.log(`templateOptionsPath: ${templateOptionsPath}`);

    console.log();

    const maker = new Maker();
    console.log(`variables: \n${(JSON.stringify(maker)).replaceAll(",", ",\n")}`);

    console.log();
    console.log("FINISH");
}

/**
 * Handles the specified error by throwing it.
 *
 * @param {Error} error - The error to be handled.
 *
 * @throws {Error} - The error object thrown.
 */
function handleError(error) {
    if (error) throw error;
}
