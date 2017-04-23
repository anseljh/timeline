const path = require('path')

function config() {
	switch (process.env.NODE_ENV) {
		case 'test':
			return 'test'
		default:
			return 'web'
	}
}

module.exports = require(path.join(process.cwd(), 'webpack', config()))
