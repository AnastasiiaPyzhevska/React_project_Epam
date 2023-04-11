const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { devServer } = require('./webpack.dev-server');
const { modules } = require('./webpack.modules');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  plugins: [new HTMLWebpackPlugin({ template: './public/index.html' }), new CleanWebpackPlugin()],
  devServer,
  module: modules,
  resolve: {
    extensions: ['.ts', '.js', '.jsx'],
    modules: ['src', 'node_modules'],
    alias: {
      components: path.resolve(__dirname, 'components/'),
      common: path.resolve(__dirname, 'common/'),
    },
  },
};
