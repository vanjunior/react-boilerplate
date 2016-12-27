var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV			= process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const DIR_NAME		= __dirname;
const SOURCE_SRC	= `${DIR_NAME}/src`;
const SOURCE_ASSET 	= `${DIR_NAME}/assets`;
const SOURCE_PUBLIC = `${DIR_NAME}/public`;
const NODE_MODULES	= `${DIR_NAME}/node_modules`;

function pathResolve(p) {
	return path.resolve(DIR_NAME, p);
}

const config = {
	name: 'js',
	entry: {
		bundle: [
			pathResolve(`${SOURCE_SRC}/index.js`),
			pathResolve(`${SOURCE_ASSET}/scss/app.scss`)
		]
	},
	output: {
		path: pathResolve(`${SOURCE_PUBLIC}/`),
		publicPath: '/js/',
		filename: '/js/[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loaders: ['style-loader', 'css-loader']
			},
			{
				test: /\.scss$/,
				// loaders: ['style-loader', 'css-loader', 'sass-loader']
				loader:  ExtractTextPlugin.extract(
					['css', 'sass?sourceMap']
				)
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('css/[name].css', {
		  allowChunks: true
		}),
		new webpack.optimize.UglifyJsPlugin({
			mangle: false,
			minimize: true
		})
    ],
	resolve: {
		modulesDirectories: ['./node_modules']
	},
	devServer: {
		contentBase: './public/',
		compress: true,
		port: 9000,
		historyApiFallback: true
	}
}

module.exports = config;
