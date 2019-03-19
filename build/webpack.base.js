const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

const assetsPath = 'assets';

module.exports = {
	target: 'web',
	entry: {
		bundle: [
			path.resolve(__dirname, '../app/index.js')
		]
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: path.join(assetsPath, 'img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: path.join(assetsPath, 'fonts/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.yaml$/,
				use: ['json-loader', 'yaml-loader']
			}
		]
	},
	resolve: {
		extensions: ['.js', '.vue']
	},
	optimization: {
		splitChunks: {
			name: true,
			cacheGroups: {
				commons: {
					test: /node_modules/,
					name: 'vendors',
					chunks: 'all'
				}
			},
		}
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.EnvironmentPlugin(['BUILD'])
	],
	node: false
};
