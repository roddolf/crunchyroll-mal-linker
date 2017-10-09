const webpackMerge = require('webpack-merge');

const commonConf = require('./webpack.common.js');
module.exports = webpackMerge(commonConf, {
    devtool: "source-map",
});