import title from 'title-slide'
import events from 'utils/eventsDirectoryToSlideArray'
import tags from 'utils/Tags'
import eras from 'models/Eras'
import Timeline from 'models/Timeline'
import {keys} from 'lodash'

export default new Timeline(title, eras, events, keys(tags))
