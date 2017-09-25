export const id = "iterable"

export const data = {
  "name": "Iterable",
  "slug": "iterable",
  "createdAt": "2014-03-11T23:48:41Z",
  "note": "",
  "website": "https://iterable.com/",
  "description": "Growth hack the inbox with Iterable's all-in-one email platform for transactional, blast and drip campaign messages. Segment subscribers, run A/B tests and create action-based workflows for maximum email revenue and engagement.",
  "level": 3,
  "categories": [
    "Email"
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
    "page": false,
    "track": true
  },
  "basicOptions": [
    "apiKey"
  ],
  "advancedOptions": [
    "trackAllPages",
    "trackNamedPages",
    "trackCategorizedPages"
  ],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can find your iterable API key under your \"API Configuration Settings\". It should look something like this: 42f187310705012194bd0bd694905664ae.",
      "label": "API Key",
      "private": true,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Iterable API Key, it should look something like this: 42f187310705012194bd0bd694905664ae"
        ]
      ]
    },
    "trackAllPages": {
      "default": false,
      "description": "Send an event for every page.",
      "label": "Track All Pages",
      "type": "boolean"
    },
    "trackCategorizedPages": {
      "default": true,
      "description": "Send an event for every page with a category.",
      "label": "Track Categorized Pages",
      "type": "boolean"
    },
    "trackNamedPages": {
      "default": true,
      "description": "Send an event for every page with a name.",
      "label": "Track Named Pages",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/iterable-default.svg"
  },
  "id": "iterable"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/iterable-default.svg"
}

export default data
