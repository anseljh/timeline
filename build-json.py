"""
Convert event data from L4GG timeline to JSON
Usage: python3 events2json L4GG_DIR OUTPUT_FILE
    where L4GG_DIR is the path to your checkout of the timeline project
    and OUTPUT_FILE is the name of the file you want to write your JSON to.
Requires: Python >= 3.5
"""
import json
import os
import sys
from pathlib import Path
from pprint import pprint
from datetime import datetime

ONE_OFF_MAPPING = {
    'media-caption.html': 'media_caption',
    'media-credit.html': 'media_credit',
    'media-url.txt': 'media_url',
    'slide-title.html': 'title',
    'start-date.txt': 'date_string'
}


def parse_event(event_path):
    event = {}
    for x in event_path.iterdir():
        if x.name in ONE_OFF_MAPPING:
            value = open(x).read().strip()
            if value == '':
                value = None
            event[ONE_OFF_MAPPING[x.name]] = value
        if x.name == 'tags.csv':
            tags_str = open(x).read().strip()
            tags_list = tags_str.split(',')
            event['tags'] = tags_list
        if x.name == 'slide-text.html':
            value = open(x).read()
            event['text'] = value
    # TODO: Use strptime() to make a datetime object
    return event


if __name__ == '__main__':
    # Prepare events directory using pathlib
    events_path_given = sys.argv[1]
    events_path_nice = events_path_given
    if not events_path_given.endswith(os.sep):
        events_path_nice += os.sep
    events_path_nice += 'src' + os.sep + 'events'
    print(events_path_nice)
    root = Path(events_path_nice)

    # Build events
    events = []
    year_dirs = [y for y in root.iterdir() if y.is_dir()]
    for year_dir in year_dirs:
        event_dirs = [x for x in year_dir.iterdir() if x.is_dir()]
        for event_dir in event_dirs:
            events.append(parse_event(event_dir))

    # Write JSON output
    output_f = open(sys.argv[2], 'w')
    json.dump(events, output_f)
    print("Done!")
