const path = require("path");
const {getTemplatePath, getModulesPath} = require("./buildTemplateHandler/utils");
const fs = require("fs");
const COMMAND = {
    CREATE_COMPONENT: "c",
};

const markerPrefix = "APP_EXAMPLE_____MARKER_";
const tagPrefix = "app-";
const templateOptionsPath = path.join(__dirname, "buildOptions", "templateOptions.js");
const modulesPath = getModulesPath();

const cmdCommand = process.argv[2];
const newComponentName = process.argv[3];

class Maker {
    marker
    tag
    pathPart
    dir
    absoluteDirPath
    tsFileName
    htmlFileName
    componentTsPath
    componentHtmlPath
    absoluteComponentTsPath
    absoluteComponentHtmlPath
    htmlTemplate
    componentClassName
    tsTemplate

    modulesImportString
    modulesImportStringDecorated

    constructor() {
        this.marker = markerPrefix + newComponentName.toUpperCase();
        this.pathPart = newComponentName.toLowerCase();
        this.tag = tagPrefix + this.pathPart;
        this.dir = this.pathPart;
        this.tsFileName = `${this.pathPart}.ts`;
        this.htmlFileName = `${this.pathPart}.html`;
        this.componentTsPath = path.join(this.dir, this.tsFileName);
        this.componentHtmlPath = path.join(this.dir, this.htmlFileName);
        this.absoluteDirPath = getTemplatePath(this.dir);
        this.absoluteComponentTsPath = getTemplatePath(this.componentTsPath);
        this.absoluteComponentHtmlPath = getTemplatePath(this.componentHtmlPath);
        this.componentClassName = `${this.pathPart[0].toUpperCase()}${this.pathPart.substring(1)}`
        this.modulesImportString = `import {${this.componentClassName}} from "../modules/elements/${this.pathPart}/${this.pathPart}";`;
        this.modulesImportStringDecorated = `${this.modulesImportString}\n`;

        this.registerOnTemplateOptions();
    }

    createTemplates() {
        this.htmlTemplate = `<div>Hello ${this.htmlFileName}</div>`;
        this.tsTemplate = `
import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";

export class ${this.componentClassName} implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onCreate(): void {
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}`;
        fs.mkdirSync(this.absoluteDirPath);
        fs.writeFile(this.absoluteComponentTsPath, this.tsTemplate, (error) => handleError(error));
        fs.writeFile(this.absoluteComponentHtmlPath, this.htmlTemplate, (error) => handleError(error));
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

handleArguments();

function handleArguments() {
    if (cmdCommand !== COMMAND.CREATE_COMPONENT) return;
    if (!newComponentName) return;

    console.log(`cmdCommand: ${cmdCommand}`);
    console.log(`newComponentName: ${newComponentName}`);
    console.log(`templateOptionsPath: ${templateOptionsPath}`);

    const maker = new Maker();
    console.log(`variables: \n${(JSON.stringify(maker)).replaceAll(",", ",\n")}`);
}

function handleError(error) {
    if (error) throw error;
}
