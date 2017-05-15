const express = require('express')
const events = require('./dist/events.json')

const app = express()
const port = process.env.PORT ? process.env.PORT : 3000

app.get('/api/events', (req, res) => res.json(events))
app.use(express.static('dist'))

app.listen(port, function () {
	console.log(`Server listening on port ${port}`)
})
