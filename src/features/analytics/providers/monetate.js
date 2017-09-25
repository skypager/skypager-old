export const id = "monetate"

export const data = {
  "name": "Monetate",
  "slug": "monetate",
  "createdAt": "2014-02-11T09:22:01Z",
  "note": "Monetate works differently than other integrations. Their javascript is synchronous, so you'll need to drop their javascript snippet onto the page outside of Segment as the first item in the head tag. As soon as you do that, we'll send custom events through to Monetate to help you measure A/B test conversions.",
  "website": "http://monetate.com/",
  "description": "Monetate helps you turn real-time big data into personalized digital experience.",
  "level": 5,
  "categories": [
    "A/B Testing",
    "Personalization"
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
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "retail"
  ],
  "advancedOptions": [],
  "options": {
    "retail": {
      "default": false,
      "description": "Monetate has two API's Retail and General, Enable this setting to use Monetate's Retail API.",
      "label": "Retail",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/monetate-default.svg"
  },
  "id": "monetate"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/monetate-default.svg"
}

export default data
