import superagent from 'superagent'
import title from 'title-slide'
import tags from 'utils/Tags'
import eras from 'models/Eras'
import Timeline from 'models/Timeline'
import {keys} from 'lodash'

function generateTimeline(events) {
	return new Timeline(title, eras, events, keys(tags))
}

export default function() {
	if (process.env.NODE_ENV === 'production') {
		return superagent.get('/api/v1/events')
			.then(response => generateTimeline(response.body))
	} else {
		const events = require('./utils/eventsDirectoryToSlideArray').default
		return Promise.resolve(generateTimeline(events))
	}
}
