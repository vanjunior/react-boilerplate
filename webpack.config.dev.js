const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : 'development';

module.exports = {
	devtool: '#eval-source-map',
	module: {
	  rules: [
		  {
			  test: /\.scss$/,
			  loader: ['style-loader', 'css-loader', 'sass-loader']
		  }
	  ]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': ENV
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
