const webpack = require('webpack')
const generateConfig = require('./base')

const config = generateConfig()
config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
	name: 'vendor',
	minChunks: Infinity,
	filename: 'vendor.bundle.js'
}))

module.exports = config
