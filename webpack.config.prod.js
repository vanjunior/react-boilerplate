const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const projectRoot = path.resolve(__dirname, './');
const publicRoot = path.join(projectRoot, 'public');
const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

module.exports = {
	devtool: '#source-map',
	output: {
		path: publicRoot,
		filename: 'js/[name]-[hash].js',
		chunkFilename: 'js/[id]-[hash].js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				loader: ExtractTextWebpackPlugin.extract('css-loader!resolve-url-loader!sass-loader')
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV)
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ExtractTextWebpackPlugin({
			filename: 'css/style-[contenthash].css'
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			},
			chunksSortMode: 'dependency'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function (module, count) {
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
				)
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
			warning: false
		})
	]
};
