var path = require('path');

const DIR_NAME		= __dirname;
const SOURCE_SRC	= `${DIR_NAME}/src`;
const SOURCE_ASSET 	= `${DIR_NAME}/assets`;
const SOURCE_PUBLIC = `${DIR_NAME}/public`;

function pathResolve(p) {
	return path.resolve(DIR_NAME, p);
}

module.exports = {
	entry: [
		pathResolve(`${SOURCE_SRC}/index.js`)
	],
	output: {
		path: pathResolve(`${SOURCE_PUBLIC}/js/`),
		publicPath: '/js/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	resolve: {
		extensions: [
			'.js',
			'.jsx'
		]
	},
	devServer: {
		contentBase: './public/',
		compress: true,
		port: 9000,
		historyApiFallback: true
	}
};
