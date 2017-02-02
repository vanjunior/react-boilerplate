const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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

const config = webpackMerge(mergeConfig , {
	entry: {
		bundle: './src/js/index.js'
	},
	output: {
		path: publicRoot,
		filename: 'js/[name]-[hash].js'
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
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: 'images/[name].[hash:7].[ext]'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								quality: 90,
								progressive: true,
							},
							gifsicle: {
								interlaced: false,
							},
							optipng: {
								optimizationLevel: 4,
							},
							pngquant: {
								quality: '75-90',
								speed: 3,
							},
							bypassOnDebug: false
						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: 'fonts/[name].[hash:7].[ext]'
						}
					}
				]
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
