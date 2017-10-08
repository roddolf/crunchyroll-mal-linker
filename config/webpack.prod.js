const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const commonConf = require('./webpack.common.js');
module.exports = webpackMerge(commonConf, {
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',

			options: {
				presets: ['es2015']
			}
		}]
	},

	plugins: [
		new UglifyJSPlugin(),
	]
});