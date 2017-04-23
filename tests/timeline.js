import chai from 'chai'
import timeline from '../src/timeline'

chai.use(require('chai-json-schema'))
const assert = chai.assert

describe('Timeline', function() {
	const startEvents = timeline._currentEvents()

	it('can remove event', function() {
		const [eventToRemove] = startEvents
		const startEventCount = timeline._currentEvents().length
		timeline._removeEvents([eventToRemove])
		assert.equal(startEventCount - 1, timeline._currentEvents().length)
	})

	it('can add event', function() {
		const [eventToAdd] = startEvents
		const startEventCount = timeline._currentEvents().length
		timeline._addEvents([eventToAdd])
		assert.equal(startEventCount + 1, timeline._currentEvents().length)
	})

	it('can remove multiple events', function() {
		timeline._removeEvents(startEvents)
		assert.equal(timeline._currentEvents().length, 0)
	})

	it('can add multiple events', function() {
		timeline._addEvents(startEvents)
		assert.equal(timeline._currentEvents().length, startEvents.length)
	})
})
