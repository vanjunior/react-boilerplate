var path 				= require('path');
var webpack 			= require('webpack');
var ExtractTextPlugin 	= require('extract-text-webpack-plugin');
var HtmlWebpackPlugin 	= require('html-webpack-plugin');

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
	devtool: 'eval-source-map',
	entry: {
		bundle: pathResolve(`${SOURCE_SRC}/js/index.js`)
	},
	output: {
		path: pathResolve(`${SOURCE_PUBLIC}/`),
		filename: './js/[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css!sass')
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin('./css/[name].css', {
			allowChunks: true
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			inject: 'body'
		})
    ],
	resolve: {
		modules: [ NODE_MODULES ]
	},
	devServer: {
		contentBase: './public/',
		port: 9000
	}
};

module.exports = config;
