import {differenceWith, some} from 'lodash'

let TimelineJS3
if (process.env.NODE_ENV === 'test') {
	// Mock TimelineJS3 api so we can test in non-browser environment
	TimelineJS3 = {
		Timeline: class TestTimeline {
			constructor(title, config, options) {
				this.config = config
				this.add = event => {
					this.config.events = [event, ...this.config.events]
				}
				this.removeId = id => {
					throw('removeId not implemented')
				}
			}
		}
	}
} else {
	TimelineJS3 = TL // TL is available globally in browser environment
}

function eventsComparator(eventA, eventB) {
	return eventA.unique_id === eventB.unique_id
}

export default class Timeline {
	constructor(title, eras, events, tags) {
		const options = {
			hash_bookmark: true,
			scale_factor: 100,
			start_at_end: false,
			debug: process.env.DEBUG === 'TRUE',
			ga_property_id: process.env.GA_PROPERTY_ID,
			api_key_embedly: process.env.EMBEDLY_API_KEY
		}
		this.events = events
		this._allTags = tags
		this.tags = new Set(this._allTags)
		this._TL = new TimelineJS3.Timeline(
			'timeline',
			{
				title,
				eras,
				events: this._filterEvents(this.events)
			},
			options
		)
	}

	showTag(tag) {
		this.tags.add(tag)
		this._updateEvents()
	}

	hideTag(tag) {
		this.tags.delete(tag)
		this._updateEvents()
	}

	resetTags() {
		this.tags = new Set(this._allTags)
		this._updateEvents()
	}

	setMinDate(date = null) { // accepts a JavaScript Date object
		this._minDate = date && date.getTime()
		this._updateEvents()
	}

	setMaxDate(date = null) { // accepts a JavaScript Date object
		this._maxDate = date && date.getTime()
		this._updateEvents()
	}

	resetDateRange() {
		this._minDate = null
		this._maxDate = null
		this._updateEvents()
	}

	reset() {
		this.tags = new Set(this._allTags)
		this._minDate = null
		this._maxDate = null
		this._updateEvents()
	}

	_currentEvents() {
		return this._TL.config.events
	}

	_filterEvents(events) {
		return events.filter(event => this._filterEvent(event))
	}

	_filterEvent(event) {
		// Filter by start_date
		if (this._minDate && this._minDate > event.start_date.getTime()) {
			return false
		}
		if (this._maxDate && this._maxDate < event.start_date.getTime()) {
			return false
		}
		// Filter by tags
		return event.tags.length === 0 || some(event.tags, tag => this.tags.has(tag))
	}

	_updateEvents() {
		const futureEvents = this._filterEvents(this.events)
		const eventsToAdd = differenceWith(futureEvents, this._currentEvents(), eventsComparator)
		const eventsToRemove = differenceWith(this._currentEvents(), futureEvents, eventsComparator)

		this._addEvents(eventsToAdd)
		this._removeEvents(eventsToRemove)
	}

	_addEvents(events) {
		events.forEach(event => this._TL.add(event))
	}

	_removeEvents(events) {
		try {
			events.forEach(event => this._TL.removeId(event.unique_id))
		} catch(e) {
		}
	}
}
