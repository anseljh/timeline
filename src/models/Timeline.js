import 'script-loader!TimelineJS3/compiled/js/timeline.js'
import {differenceWith, some} from 'lodash'

const options = {
	hash_bookmark: true,
	scale_factor: '0.5',
	debug: process.env.DEBUG === 'TRUE',
	ga_property_id: process.env.GA_PROPERTY_ID,
	api_key_embedly: process.env.EMBEDLY_API_KEY
}

function eventsComparator(eventA, eventB) {
	return eventA.unique_id === eventB.unique_id
}

export default class Timeline {
	constructor(title, events, tags) {
		this.events = events
		this.tags = new Set(tags)
		this._TL = new TL.Timeline(
			'timeline',
			{title, events: this._filteredEvents()},
			options,
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

	_currentEvents() {
		return this._TL.config.events
	}

	_filteredEvents() {
		return this.events.filter(event => event.tags.length === 0 || some(event.tags, tag => this.tags.has(tag)))
	}

	_updateEvents() {
		const futureEvents = this._filteredEvents()
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
