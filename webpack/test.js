const path = require('path')
const nodeExternals = require('webpack-node-externals')
const WebpackShellPlugin = require('webpack-shell-plugin')
const generateConfig = require('./base')

const config = generateConfig()
config.entry = 'test.js'
config.output = {
	filename: 'testBundle.js',
	path: path.join(__dirname, '../dist/.tmp-tests')
}
config.target = 'node'
config.externals = [nodeExternals()]
config.node = {
	fs: 'empty'
}
config.plugins.push(new WebpackShellPlugin({
	onBuildExit: 'mocha dist/.tmp-tests/testBundle.js'
}))
config.stats = 'none'
delete config.devtool

module.exports = config
