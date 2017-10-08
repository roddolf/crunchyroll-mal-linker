const webpackMerge = require('webpack-merge');

const commonConf = require('./webpack.common.js');
module.exports = merge(commonConf, {
    devtool: "source-map",
});