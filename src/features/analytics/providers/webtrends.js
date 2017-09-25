export const id = "webtrends"

export const data = {
  "name": "Webtrends",
  "slug": "webtrends",
  "createdAt": "2015-06-09T18:53:53.264Z",
  "note": "",
  "website": "http://webtrends.com",
  "description": "Webtrends is a digital marketing company providing measurement, optimization and social enterprise solutions.",
  "level": 5,
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
    "alias": false,
    "group": false,
    "identify": false,
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
      "default": "http://scs.webtrends.com/segmentio",
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "alt": "https://s3.amazonaws.com/segmentio/logos/webtrends-alt.png",
    "default": "https://s3.amazonaws.com/segmentio/logos/webtrends-default.svg"
  },
  "id": "webtrends"
}

export const logos = {
  "alt": "https://s3.amazonaws.com/segmentio/logos/webtrends-alt.png",
  "default": "https://s3.amazonaws.com/segmentio/logos/webtrends-default.svg"
}

export default data
