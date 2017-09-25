export const id = "facebook-conversion-tracking"

export const data = {
  "name": "Facebook Conversion Tracking",
  "slug": "facebook-conversion-tracking",
  "createdAt": "2014-01-18T09:39:00Z",
  "note": "",
  "website": "https://developers.facebook.com/docs/ads-for-websites",
  "description": "The Facebook Conversion Tracking integration lets you measure and optimize the performance of your Facebook Ads.",
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
    "events"
  ],
  "advancedOptions": [],
  "options": {
    "events": {
      "default": {},
      "description": "Facebook recognizes pixel ids, not custom events. When you `analytics.track(event, properties)` an event that represents a Facebook conversion, you'll need to map the event name on the left to it's corresponding Facebook pixel id on the right. Email [friends@segment.io](mailto:friends@segment.io) if you need help!",
      "label": "Events",
      "type": "text-map"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/facebook-conversion-tracking-default.svg"
  },
  "id": "facebook-conversion-tracking"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/facebook-conversion-tracking-default.svg"
}

export default data
