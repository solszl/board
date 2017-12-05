var webpack = require('webpack');

module.exports = {
    entry: __dirname + "/src/main.ts",
    output: {
        path: __dirname + '/dist',
        filename: 'board-core.js',
        library: 'boardCore'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts']
    },
    devtool: "source-map"
}