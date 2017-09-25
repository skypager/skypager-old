export const id = "awe.sm"

export const data = {
  "name": "awe.sm",
  "slug": "awe.sm",
  "createdAt": "2013-09-20T22:36:58Z",
  "note": "",
  "website": "http://awe.sm",
  "description": "awe.sm is an analytics tool to measure social interactions, so you can determine the ROI for each tweet or post and know which tactics are working and which aren't.",
  "level": 2,
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
    "apiKey",
    "events"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "Your awe.sm API key. It should be a 64-character hexidecimal string.",
      "label": "API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your awe.sm API Key."
        ],
        [
          "regexp",
          "^[a-f0-9]{64}$",
          "Please double check your API Key. It should be a 64-character hexidecimal string."
        ]
      ]
    },
    "events": {
      "default": {},
      "description": "awe.sm only accepts events like `goal_1` and `goal_7`. When you `analytics.track(event, properties)` an event with a custom name, we need to map those custom names to awe.sm goals. Enter a custom event name on the left, and the awe.sm goal number you want on the right. Email [friends@segment.io](mailto:friends@segment.io) if you need help!",
      "label": "Events",
      "max": 10,
      "prefix": "goal_",
      "type": "map"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/awesm-default.svg"
  },
  "id": "awe.sm"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/awesm-default.svg"
}

export default data
