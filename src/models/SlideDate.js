import moment from 'moment'

export default class SlideDate {
	constructor(dateISOString, displayDateString = null) {
		const dateArray = dateISOString.split('-')
		const date = moment(dateISOString, 'YYYY-MM-DD')

		this.year = date.year()
		if (dateArray.length >= 3) {
			this.day = date.date()
		}
		if (dateArray.length >= 2) {
			this.month = date.month() + 1
		}
		this.display_date = displayDateString
	}
}
