import moment from 'moment'
const today = new moment()

export default [
	{
		start_date: {
			year: 2015,
			month: 6,
			day: 16
		},
		end_date: {
			year: 2016,
			month: 11,
			day: 9
		},
		text: {
			headline: "2016 Presidential Campaign"
		},
	},
	{
		start_date: {
			year: 2016,
			month: 11,
			day: 9
		},
		end_date: {
			year: 2017,
			month: 1,
			day: 20
		},
		text: {
			headline: "Transition Period"
		},
	},
	{
		start_date: {
			year: 2017,
			month: 1,
			day: 20
		},
		end_date: {
			year: today.year(),
			month: today.month() + 1,
			day: today.date() + 1
		},
		text: {
			headline: "Trump Administration"
		}
	}
]
