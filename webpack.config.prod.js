const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const projectRoot = path.resolve(__dirname, './');
const publicRoot = path.join(projectRoot, 'public');
const ENV = process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : 'development';

module.exports = {
	devtool: '#source-map',
	output: {
		path: publicRoot,
		filename: path.join(publicRoot, 'js/[name]-[hash].js'),
		chunkFilename: path.join(publicRoot, 'js/[id]-[hash].js')
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				loader: ExtractTextWebpackPlugin.extract('css-loader!sass-loader?sourceMap')
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': ENV
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: true
		}),
		new ExtractTextWebpackPlugin({
			filename: path.join(publicRoot, 'css/[name]-[contenthash].css')
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
            names: ['vendor', 'manifest']
        })
		// new webpack.LoaderOptionsPlugin({
		// 	minimize: true,
		// 	debug: false,
		// 	warning: false
		// })
	]
};
