"use strict";

var path = require("path");
var protoLoader = path.resolve(__dirname, "../src/index.js");

module.exports = {
    entry: path.resolve(__dirname, "./index.js"),
    output: {
        path: path.resolve(__dirname, "./output"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.proto$/,
                loader: protoLoader
            }
        ]
    }
};
