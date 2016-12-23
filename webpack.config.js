const SOURCE_JS 	= './src/';
const SOURCE_ASSET 	= './assets/';
const SOURCE_PUBLIC = './public/';

module.exports = {
	entry: [
		`${SOURCE_JS}/index.js`
	],
	output: {
		path: `${SOURCE_PUBLIC}/js/`,
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: [
					'react',
					['latest', {
						es2015: true
					}]
				]
			}
		}]
	},
	resolve: {
		extensions: [
			'.js',
			'.jsx'
		]
	},
	devServer: {
		contentBase: SOURCE_PUBLIC,
		compress: true,
		port: 9000,
		historyApiFallback: true
	}
};
