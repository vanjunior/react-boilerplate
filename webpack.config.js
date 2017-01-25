var path 						= require('path');
var webpack 					= require('webpack');
var ExtractTextWebpackPlugin 	= require('extract-text-webpack-plugin');
var HtmlWebpackPlugin 			= require('html-webpack-plugin');

const ENV			= process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const DIR_NAME		= __dirname;
const SOURCE_SRC	= `${DIR_NAME}/src`;
const SOURCE_ASSET 	= `${DIR_NAME}/assets`;
const SOURCE_PUBLIC = `${DIR_NAME}/public`;
const NODE_MODULES	= `${DIR_NAME}/node_modules`;

const VENDOR_LIBS = [
	"axios",
	"lodash",
	"react",
	"react-dom",
	"react-redux",
	"redux",
	"redux-form",
	"redux-thunk"
];

const config = {
	entry: {
		bundle: './src/js/index.js',
		vendor: VENDOR_LIBS
	},
	output: {
		path: path.join(__dirname, 'public'),
		filename: './js/[name]-[chunkhash].js'
	},
	module: {
		rules: [
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
		new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
		new ExtractTextPlugin('./css/[name].css', {
			allowChunks: true
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html'
		}),
		new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
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
