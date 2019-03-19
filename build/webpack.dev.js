const path = require('path');
const webpackBase = require('./webpack.base');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../config.json');

module.exports = merge(webpackBase, {
	mode: 'development',
	devServer: {
		proxy: {
			'/api': config.serverName
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'less-loader'
				]
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './template/index.html')
		})
	]
});