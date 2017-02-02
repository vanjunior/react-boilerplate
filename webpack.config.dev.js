const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

module.exports = {
	devtool: '#eval-source-map',
	entry: {
		bundle: [
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:9000',
			'webpack/hot/only-dev-server',
			'./src/js/index.js'
		]
	},
	module: {
	  rules: [
		  {
			  test: /\.scss$/,
			  use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader']
		  }
	  ]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV)
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			inject: true
		})
	]
};
