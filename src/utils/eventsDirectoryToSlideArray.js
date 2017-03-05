import eventDirToSlide from 'utils/eventDirectoryToSlide'
const eventsDirectory = require("dir-loader!../events")
const events = []

Object.keys(eventsDirectory).forEach(year => Object.keys(eventsDirectory[year]).map(eventKey => {
	events.push(eventDirToSlide(eventsDirectory[year][eventKey]))
}))

export default events
