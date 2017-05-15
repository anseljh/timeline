import fs from 'fs'
import events from './src/utils/eventsDirectoryToSlideArray'

fs.writeFileSync('dist/events.json', JSON.stringify(events))
fs.unlinkSync('dist/generate-events.js')
