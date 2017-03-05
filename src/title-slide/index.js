import Slide from 'models/Slide'
import SlideContent from 'models/SlideContent'

import title from './slide-title.html'
import text from './slide-text.html'

const titleSlide = new Slide(
	null,
	new SlideContent(title, text),
	null,
	null
)

export default {
	...titleSlide,
	unique_id: 'timeline'
}
