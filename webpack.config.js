const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: ['@babel/polyfill', './src/index.jsx'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash].js',
	},

	devServer: {
		port: 3000,
	},

	plugins: [
		new HTMLWebpackPlugin({ template: './public/index.html' }),
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(jpg|jpeg|png|svg)$/,
				use: ['file-loader'],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},
};
