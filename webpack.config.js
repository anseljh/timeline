require('dotenv').config()
const webpack = require('webpack')
const path = require('path')
const BabiliPlugin = require('babili-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const sourcePath = path.join(__dirname, './src')
const staticsPath = path.join(__dirname, './dist')

const port = process.env.PORT ? process.env.PORT : 3000

module.exports = function () {
	const nodeEnv = process.env.NODE_ENV || 'development'
	const isProd = nodeEnv === 'production'

	const plugins = [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity,
			filename: 'vendor.bundle.js'
		}),
		new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG', 'GA_PROPERTY_ID', 'EMBEDLY_API_KEY']),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.ejs',
			favicon: 'images/favicon.png',
			inject: 'body',
			hash: isProd,
			cache: !isProd,
			showErrors: isProd,
			minify: isProd && {
				collapseWhitespace: true,
				html5: true,
			}
		})
	]

	if (isProd) {
		plugins.push(
			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false
			}),
			new BabiliPlugin()
		)
	} else {
		plugins.push(
			new webpack.HotModuleReplacementPlugin()
		)
	}

	return {
		devtool: isProd ? 'source-map' : 'eval',
		context: sourcePath,
		entry: {
			js: './index.js'
		},
		output: {
			path: staticsPath,
			filename: 'app.bundle.js',
			publicPath: isProd ? './' : '/'
		},
		module: {
			rules: [
				{
					test: /\.html$/,
					exclude: /node_modules/,
					use: {
						loader: 'html-loader',
						query: {
							name: '[name].[ext]'
						},
					},
				},
				{
					test: /\.css$/,
					exclude: /node_modules/,
					use: [
						'style-loader',
						'css-loader'
					]
				},
				{
					test: /\.scss$/,
					use: [{
						loader: 'style-loader'
					}, {
						loader: 'css-loader'
					}, {
						loader: 'sass-loader'
					}]
				},
				{
					test: /\.(ttf|eot|svg|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: 'file-loader'
				},
				{
					test: /\.(jpg|jpeg|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: 'file-loader'
				},
				{
					test: /\.(txt|csv)$/,
					use: 'raw-loader'
				},
				{
					test: /\.(js)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						query: {
							presets: ['es2015', 'stage-2']
						}
					},
				},
			],
		},
		resolve: {
			extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js'],
			modules: [
				path.resolve(__dirname, 'node_modules'),
				sourcePath,
			],
			alias: {
				images: path.join(sourcePath, 'images'),
				models: path.join(sourcePath, 'models'),
				utils: path.join(sourcePath, 'utils'),
			}
		},

		plugins,

		performance: isProd && {
			maxAssetSize: 300000,
			maxEntrypointSize: 1000000,
			hints: 'warning'
		},

		stats: {
			colors: {
				green: '\u001b[32m'
			}
		},

		devServer: {
			contentBase: './src',
			historyApiFallback: true,
			port: port,
			compress: isProd,
			inline: !isProd,
			hot: !isProd,
			stats: {
				assets: true,
				children: false,
				chunks: false,
				hash: false,
				modules: false,
				publicPath: false,
				timings: true,
				version: false,
				warnings: true,
				colors: {
					green: '\u001b[32m',
				}
			},
		}
	}
}
