var path 						= require('path');
var webpack 					= require('webpack');
var ExtractTextWebpackPlugin 	= require('extract-text-webpack-plugin');
var HtmlWebpackPlugin 			= require('html-webpack-plugin');

const ENV			= process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

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
	devtool: (ENV === 'development') ? 'eval': '',
	entry: {
		bundle: './src/js/index.js',
		vendor: VENDOR_LIBS
	},
	output: {
		path: path.join(__dirname, './public/'),
		filename: './js/[name]-[hash].js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextWebpackPlugin.extract('css-loader!sass-loader')
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
		new ExtractTextWebpackPlugin({
			filename: './css/[name]-[contenthash].css'
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		})
    ],
	resolve: {
		modules: ["node_modules"],
		descriptionFiles: ["package.json"]
	}
};

module.exports = config;
