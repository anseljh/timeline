const context = require.context('../tests/unit', true, /\.js$/)
context.keys().forEach(context)

module.exports = context
