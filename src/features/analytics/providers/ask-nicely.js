export const id = "ask-nicely"

export const data = {
  "name": "Ask Nicely",
  "slug": "ask-nicely",
  "createdAt": "2015-04-03T17:01:12Z",
  "note": "",
  "website": "http://www.asknice.ly/",
  "description": "Track NPS daily, fix issues before customers churn, create a sales force of loyal customers.",
  "level": 1,
  "categories": [
    "Surveys"
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
      "default": "https://api.asknice.ly/segmentv1/",
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/ask-nicely-default.svg"
  },
  "id": "ask-nicely"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/ask-nicely-default.svg"
}

export default data
