export const id = "twitter-ads"

export const data = {
  "name": "Twitter Ads",
  "slug": "twitter-ads",
  "createdAt": "2014-02-06T08:59:52Z",
  "note": "",
  "website": "https://ads.twitter.com/",
  "description": "Advertise on Twitter and reach out to more people with promoted tweets and accounts.",
  "level": 3,
  "categories": [
    "Advertising"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": false,
    "server": false
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": false,
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "page",
    "events"
  ],
  "advancedOptions": [],
  "options": {
    "events": {
      "default": {},
      "description": "Twitter recognizes pixel ids, not custom events. When you `analytics.track(event, properties)` an event that represents a Twitter conversion, you'll need to map the event name on the left to it's corresponding Twitter pixel id on the right. Email [friends@segment.io](mailto:friends@segment.io) if you need help!",
      "label": "Events",
      "type": "text-map"
    },
    "page": {
      "default": "",
      "description": "Twitter recognizes pixel ids. This is just a special pixel id you can use to for page views. It will get executed on any call to `analytics.page()`.",
      "label": "Page Pixel",
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/twitter-ads-default.svg"
  },
  "id": "twitter-ads"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/twitter-ads-default.svg"
}

export default data
