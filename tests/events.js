import chai from 'chai'
import {keys} from 'lodash'
import events from 'utils/eventsDirectoryToSlideArray'
import timeline from '../src/timeline'
import tags from 'utils/Tags'

chai.use(require('chai-json-schema'))
const assert = chai.assert

const eventSchema = {
	title: 'Timeline Event',
	type: 'object',
	required: ['start_date', 'text', 'media', 'tags', 'unique_id'],
	properties: {
		start_date: {
			type: 'object',
			properties: {
				hour: {
					type: 'number',
					minimum: 0,
					maximum: 23
				},
				minute: {
					type: 'number',
					minimum: 0,
					maximum: 59
				},
				day: {
					type: 'number',
					minimum: 1
				},
				month: {
					type: 'number',
					minimum: 1
				},
				year: {
					type: 'number',
					minimum: 1900,
					maximum: new Date().getFullYear()
				},
				// display_date: {
				// 	type: 'string'
				// }
			},
			required: ['year']
		},
		text: {
			type: 'object',
			properties: {
				headline: {
					type: 'string',
					maxLength: 45,
					minLength: 5
				},
				text: {
					type: 'string',
					minLength: 20
				}
			},
			required: ['headline']
		},
		media: {
			type: 'object',
			properties: {
				url: {
					type: 'string'
				},
				caption: {
					type: 'string'
				},
				credit: {
					type: 'string'
				},
				// thumbnail: {
				// 	type: 'string'
				// },
			},
			required: ['url']
		},
		tags: {
			type: 'array',
			minItems: 1,
			uniqueItems: true,
			items: {
				type: 'string',
				enum: keys(tags)
			}
		},
		unique_id: {
			type: 'string'
		}
	}
}

describe('Events', function() {
	describe('count', function() {
		it('is above zero', function() {
			assert.isAbove(events.length, 0)
		})
		it('equals unfiltered timeline events count', function() {
			assert.equal(events.length, timeline._currentEvents().length)
		})
	})

	describe('schema', function() {
		for (let i=0; i < events.length; i++) {
			const event = events[i]
			it(`"${event.text.headline}"`, function() {
				assert.jsonSchema(event, eventSchema)
			})
		}
	})
})
