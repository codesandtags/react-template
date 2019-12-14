const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const hotMiddlewareScript = `webpack-hot-middleware/client?name=web&path=/__webpack_hmr&timeout=20000&reload=true`;
const isDevelopment = process.env.NODE_ENV === 'development';

const getEntryPoint = (target) => {
		if (target === 'node') {
				return ['./src/App.tsx'];
		} else if (isDevelopment) {
				return [hotMiddlewareScript, './src/index.tsx'];
		} else {
				return ['./src/index.tsx'];
		}
};

console.log('EXISTE ESTA COSA?  ', path.resolve(__dirname, 'node_modules/canvas-core-react/lib/scss/CanvasSCSS.scss'));


const getConfig = (target) => ({
		mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

		name: target,

		target,

		entry: getEntryPoint(target),

		devServer: {
				contentBase: '/dist',
				historyApiFallback: true
		},

		output: {
				path: path.resolve(__dirname, `../dist/${target}`),
				filename: '[name].js',
				publicPath: '/',
				libraryTarget: target === 'node' ? 'commonjs2' : undefined,
		},

		module: {
				rules: [
						{
								test: /\.tsx?$/,
								use: ['babel-loader', 'ts-loader'],
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
				extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.css', '.scss', '.json',]
		},

		plugins: target === 'web'
				? [
						new LoadablePlugin(),
						new webpack.HotModuleReplacementPlugin(),
						new MiniCssExtractPlugin({
								filename: '[name].css'
						})
				] : [
						new LoadablePlugin(),
						new MiniCssExtractPlugin({
								filename: '[name].css'
						})
				],

		externals: target === 'node'
				? [
						'@loadable/component',
						nodeExternals({
								whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
						})
				] : undefined,
});

module.exports = [getConfig('web'), getConfig('node')];
