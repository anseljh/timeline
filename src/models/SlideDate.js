import moment from 'moment'

export default class SlideDate {
	constructor(ISO8601String, displayDateString = null) {
		const [dateString, timeString] = ISO8601String.split('T')
		const dateArray = dateString.split('-')
		const date = moment(ISO8601String)

		this.year = date.year()
		if (timeString) {
			this.hour = date.hour()
			this.minute = date.minute()
		}
		if (dateArray.length >= 3) {
			this.day = date.date()
		}
		if (dateArray.length >= 2) {
			this.month = date.month() + 1
		}
		this.display_date = displayDateString
	}
}
