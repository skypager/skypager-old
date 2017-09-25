export const id = "whale-watch"

export const data = {
  "name": "Whale Watch",
  "slug": "whale-watch",
  "createdAt": "2015-04-09T16:01:12Z",
  "note": "",
  "website": "https://whalewat.ch",
  "description": "Whale Watch helps you optimize your engagement, monetization, and retention.",
  "level": 1,
  "categories": [
    "Analytics"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": true,
    "group": false,
    "identify": true,
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "apiKey"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "label": "API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your API Key."
        ]
      ]
    },
    "direct": {
      "default": true,
      "private": true,
      "type": "boolean"
    },
    "endpoint": {
      "default": "http://api.whalewat.ch/v1/segment.io/events",
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/whale-watch-default.svg"
  },
  "id": "whale-watch"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/whale-watch-default.svg"
}

export default data
