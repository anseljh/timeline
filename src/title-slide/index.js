import Slide from 'models/Slide'
import SlideContent from 'models/SlideContent'
import SlideMedia from 'models/SlideMedia'

import title from './slide-title.html'
import text from './slide-text.html'

const titleSlide = new Slide(
	null,
	new SlideContent(title, text),
	new SlideMedia('/images/l4gg-logo-500.png'),
	null
)

export default {
	...titleSlide,
	unique_id: 'timeline'
}
