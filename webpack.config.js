const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackDevConfig = require('./webpack.config.dev');
const webpackProdConfig = require('./webpack.config.prod');

const projectRoot = path.resolve(__dirname, './');
const publicRoot = path.join(projectRoot, 'public');

const ENV = process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : 'development';
const mergeConfig = (ENV === 'development') ? webpackDevConfig : webpackProdConfig;

const VENDOR_LIBRARY = [
	"axios",
	"lodash",
	"react",
	"react-dom",
	"react-redux",
	"redux",
	"redux-thunk"
];

const config = webpackMerge(mergeConfig, {
	entry: {
		bundle: './src/js/index.js',
		vendor: VENDOR_LIBRARY
	},
	output: {
		path: publicRoot,
		filename: path.join(publicRoot, 'js/[name]-[hash].js')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				include: [
					path.join(projectRoot, 'src')
				],
				loader: 'babel-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
					name: path.join(publicRoot, 'images/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
					name: path.join(publicRoot, 'fonts/[name].[hash:7].[ext]')
				}
			}
		]
	},
	resolve: {
		modules: [path.resolve(__dirname, "src"), "node_modules"],
		descriptionFiles: ["package.json"],
		moduleExtensions: ['-loader']
	}
});

module.exports = config;
