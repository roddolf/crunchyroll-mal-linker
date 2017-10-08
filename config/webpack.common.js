const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),

    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist')
    },

    node: {
        global: false,
        process: false,
        console: false,
        setImmediate: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },

};