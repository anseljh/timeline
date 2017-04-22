import moment from 'moment'

export default class SlideDate {
	constructor(dateTimeString, displayDateString = null) {
		const [dateString, timeString] = dateTimeString.split(' ')
		const dateArray = dateString.split('-')
		let date = moment.utc(dateTimeString, 'YYYY-MM-DD HH:mm')

		if (timeString) {
			date = date.local()
			this.hour = date.hour()
			this.minute = date.minute()
		}
		if (dateArray.length >= 3) {
			this.day = date.date()
		}
		if (dateArray.length >= 2) {
			this.month = date.month() + 1
		}
		this.year = date.year()
		this.display_date = displayDateString
	}
}
