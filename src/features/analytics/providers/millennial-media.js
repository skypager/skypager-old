export const id = "millennial-media"

export const data = {
  "name": "Millennial Media",
  "slug": "millennial-media",
  "createdAt": "2014-06-01T23:02:41Z",
  "note": "",
  "website": "http://www.millennialmedia.com/",
  "description": "Millennial Media is a mobile advertising network. This integration lets you track conversion events from mobile ad clickthroughs.",
  "level": 3,
  "categories": [
    "Advertising"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": false,
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "events"
  ],
  "advancedOptions": [],
  "options": {
    "events": {
      "default": {},
      "description": "Millennial Media recognizes pixel ids, not custom events. When you `analytics.track(event, properties)` an event that represents a Millennial Media ad conversion, you'll need to map the event name on the left to it's corresponding Millennial Media pixel id on the right.",
      "label": "Events",
      "type": "text-map"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/millennial-media-default.svg"
  },
  "id": "millennial-media"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/millennial-media-default.svg"
}

export default data
