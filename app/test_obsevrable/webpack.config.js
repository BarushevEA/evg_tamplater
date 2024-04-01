const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const appPath = require("./buildOptions/appPath");
const env = require('./buildTemplateHandler/utils');

module.exports = {
    entry: path.resolve(__dirname, 'src'),

    output: {
        filename: appPath.buildFileName,
        path: path.resolve(env.getBuildDirPath()),
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },

    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                use: [
                    {loader: 'babel-loader'},
                    {loader: 'ts-loader'}
                ],
                exclude: /node_modules/
            }],
    },

    plugins: [
        new ForkTsCheckerWebpackPlugin(),
    ]
};
