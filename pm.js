const path = require("path");
const {cpSync} = require("fs");
const fs = require("fs");

const COMMAND = {
    CREATE_PROJECT: "p",
};

const cmdCommand = process.argv[2];
const newProjectName = process.argv[3];

const emptyProjectName = "empty_project_example";
const emptyProjectPath = path.join(__dirname, "storage", emptyProjectName);
const destinationProjectPath = path.join(__dirname, "app", newProjectName);
const buildOptionsProjectPath = path.join(destinationProjectPath,"buildOptions","appPath.js");
const packageJsonProjectPath = path.join(destinationProjectPath,"package.json");
const settingsProjectPath = path.join(destinationProjectPath,"src","settings","info.ts");

handleArguments();

function handleArguments() {
    if (cmdCommand !== COMMAND.CREATE_PROJECT) return;
    if (!newProjectName) return;
    console.log("START");

    cpSync(emptyProjectPath, destinationProjectPath, {recursive: true});

    handleBuildOptions();
    handlePackageJson();
    handleProjectSettings();

    console.log("FINISH");
}

function handleBuildOptions(){
    fs.readFile(buildOptionsProjectPath, (error, data) => {
        handleError(error);

        let jsFileStr = data.toString();
        jsFileStr = jsFileStr.replaceAll(emptyProjectName, newProjectName);

        fs.writeFile(buildOptionsProjectPath, jsFileStr, (error) => handleError(error));
    });
}

function handlePackageJson(){
    fs.readFile(packageJsonProjectPath, (error, data) => {
        handleError(error);

        let jsFileStr = data.toString();
        jsFileStr = jsFileStr.replaceAll(emptyProjectName, newProjectName);

        fs.writeFile(packageJsonProjectPath, jsFileStr, (error) => handleError(error));
    });
}

function handleProjectSettings(){
    fs.readFile(settingsProjectPath, (error, data) => {
        handleError(error);

        let jsFileStr = data.toString();
        jsFileStr = jsFileStr.replaceAll(emptyProjectName, newProjectName);

        fs.writeFile(settingsProjectPath, jsFileStr, (error) => handleError(error));
    });
}

function handleError(error) {
    if (error) throw error;
}
