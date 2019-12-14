const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
		mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

		target: 'node',

		node: false, // it enables '__dirname' in files. If is not, '__dirname' always return '/'.

		entry: {
				server: './src/server.tsx',
		},

		output: {
				path: path.resolve(__dirname, '../dist'),
				filename: '[name].js',
				chunkFilename: '[name].js',
		},

		module: {
				rules: [
						{
								test: /\.tsx?$/,
								use: [
										'babel-loader', 'ts-loader',
								],
						},
						{
								test: /\.s?css$/,
								use: [
										MiniCssExtractPlugin.loader,
										'css-loader?sourceMap',
										'resolve-url-loader',
										'sass-loader?sourceMap',
								],
						},
						{
								test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
								use: [{
										loader: 'file-loader',
										options: {
												name: '[name].[ext]',
												outputPath: 'fonts/'
										}
								}
								]
						}
				],
		},

		resolve: {
				extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.css', '.scss', '.json',],
				modules: [
						path.resolve(__dirname, './node_modules')
				]
		},

		externals: [nodeExternals(
				{
						whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
				}
		)],
};
