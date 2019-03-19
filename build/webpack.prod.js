const webpackBase = require('./webpack.base');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(webpackBase, {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract([
					'css-loader'
				]),
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract([
					'css-loader',
					'less-loader'
				]),
			},
		]
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
	]
});
