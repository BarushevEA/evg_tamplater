const readline = require('readline');
const lineHelper = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
exports.askQuestion = (question) => {
    return new Promise((resolve) => {
        lineHelper.question(question, (answer) => resolve(answer));
    });
};
exports.askQuestionClose = () => lineHelper.close();

const symbolsForReplace = " -.,?!@#$%^&*()[]{}<>|~`+=\"';:";
const symbolForReplaceBy = "_";

exports.normalizeName = (newName, defaultName = "awesome_") => {
    newName = newName ? newName.trim() : defaultName + Date.now();

    for (let i = 0; i < symbolsForReplace.length; i++) {
        const symbol = symbolsForReplace[i];
        newName = newName.replace(symbol, symbolForReplaceBy);
    }
    return newName;
}


const componentSymbolsForReplace = " -.,?!@#$%^&*()[]{}<>|~`+=\"/\\1234567890';:";
const componentSymbolForReplaceBy = "_";
const prefix = "abcdefjhgk"
exports.normalizeComponentName = (newName, defaultName = "awesome_") => {
    const date = Date.now() + "";
    let suffix = "";

    for (let i = 0; i < date.length; i++) {
        const symbol = date[i];
        suffix += prefix[+symbol];
    }

    newName = newName ? newName.trim() : defaultName + suffix;

    for (let i = 0; i < componentSymbolsForReplace.length; i++) {
        const symbol = componentSymbolsForReplace[i];
        newName = newName.replace(symbol, componentSymbolForReplaceBy);
    }
    return newName;
}