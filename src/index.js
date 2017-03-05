import 'index.scss'
import title from 'title-slide'
import events from 'utils/eventsDirectoryToSlideArray'
import tags from 'utils/Tags'
import Timeline from 'models/Timeline'
import {keys} from 'lodash'

window.timeline = new Timeline(title, events, keys(tags))
