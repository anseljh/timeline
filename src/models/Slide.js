import Case from 'case'

export default class Slide {
	constructor(startDate, content, media, tags = [], background = {color: null, url: null}) {
		this.start_date = startDate
		this.text = content
		this.media = media
		this.tags = tags
		this.background = background
		this.unique_id = startDate && content ? Case.kebab(`${startDate.year}-${content.headline}`) : null
	}
}
