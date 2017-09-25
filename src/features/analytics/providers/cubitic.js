export const id = "cubitic"

export const data = {
  "name": "Cubitic",
  "slug": "cubitic",
  "createdAt": "2015-06-19T00:38:51.848Z",
  "note": "",
  "website": "http://www.cubitic.io/",
  "description": "Cubitic's predictive analytics platform transforms big data into actionable intelligence.",
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
    "alias": false,
    "group": false,
    "identify": true,
    "pageview": false,
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
      "default": "https://api.cubitic.io/v1/segment/event",
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "alt": "https://s3.amazonaws.com/segmentio/logos/cubitic-alt.png",
    "default": "https://s3.amazonaws.com/segmentio/logos/cubitic-default.svg"
  },
  "id": "cubitic"
}

export const logos = {
  "alt": "https://s3.amazonaws.com/segmentio/logos/cubitic-alt.png",
  "default": "https://s3.amazonaws.com/segmentio/logos/cubitic-default.svg"
}

export default data
