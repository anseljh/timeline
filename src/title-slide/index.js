import Slide from 'models/Slide'
import SlideContent from 'models/SlideContent'
import SlideMedia from 'models/SlideMedia'

import title from './slide-title.html'
import text from './slide-text.html'
import image from 'images/l4gg-logo-500.png'
import caption from './slide-caption.html'

const titleSlide = new Slide(
	null,
	new SlideContent(title, text),
	new SlideMedia(image, caption),
	null
)

export default {
	...titleSlide,
	unique_id: 'timeline'
}
