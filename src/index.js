import 'index.scss'
import 'script-loader!TimelineJS3/compiled/js/timeline.js'
import generateTimeline from './timeline'

generateTimeline().then(timeline => {
	window.timeline = timeline // eslint-disable-line no-undef
})
