const nodeExternals = require('webpack-node-externals')
const WebpackShellPlugin = require('webpack-shell-plugin')
const generateConfig = require('./base')

const config = generateConfig()

config.entry = '../generate-events-json.js'
config.output.filename = 'generate-events.js'
config.target = 'node'
config.externals = [nodeExternals()]
config.node = {
	fs: 'empty'
}
config.plugins.push(new WebpackShellPlugin({
	onBuildExit: 'npm run post-build'
}))

module.exports = config
