const context = require.context('../tests/integration', true, /\.js$/)
context.keys().forEach(context)

module.exports = context
