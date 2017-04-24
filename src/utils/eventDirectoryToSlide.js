import Slide from 'models/Slide'
import SlideDate from 'models/SlideDate'
import SlideContent from 'models/SlideContent'
import SlideMedia from 'models/SlideMedia'
import EventTemplate from 'utils/EventTemplate'
import Case from 'case'
import {trim, startsWith} from 'lodash'

export default function(eventDirectory) {
	function getContents(file, defaultContents) {
		return eventDirectory[file] ? trim(eventDirectory[file]['src']) : defaultContents
	}

	function getImageUrl(contents) {
		return require(`images/${contents}`)
	}

	function getBackground(file) {
		const contents = getContents(file)
		if (contents) {
			return getImageUrl(contents)
		}
	}

	function getMedia(file) {
		const contents = getContents(file)
		if (!startsWith(contents, 'http') && contents.match(/\.(jpeg|jpg|gif|png)$/)) {
			return getImageUrl(contents)
		} else {
			return contents
		}
	}

	function getTags(file) {
		const contents = getContents(file)
		const tags = contents ? contents.split(',') : []
		return tags.map(Case.constant)
	}

	const startDate = getContents(EventTemplate.START_DATE)
	const title = getContents(EventTemplate.SLIDE_TITLE)
	const text = getContents(EventTemplate.SLIDE_TEXT)
	const mediaUrl = getMedia(EventTemplate.MEDIA_URL)
	const caption = getContents(EventTemplate.MEDIA_CAPTION)
	const credit = getContents(EventTemplate.MEDIA_CREDIT)
	const tags = getTags(EventTemplate.TAGS)
	const url = getBackground(EventTemplate.BACKGROUND_URL)

	return new Slide(
		new SlideDate(startDate),
		new SlideContent(title, text),
		new SlideMedia(mediaUrl, caption, credit),
		tags,
		{url}
	)
}
