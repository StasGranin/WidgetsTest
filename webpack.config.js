const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: './src/app.jsx',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	watch: true,
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	devServer: {
		contentBase: 'public',
		historyApiFallback: true,
		compress: true,
		port: 9000
	}
};