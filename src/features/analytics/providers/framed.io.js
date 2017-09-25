export const id = "framed.io"

export const data = {
  "name": "Framed.io",
  "slug": "framed.io",
  "createdAt": "2015-03-27T23:01:12.274Z",
  "note": "",
  "website": "http://framed.io/",
  "description": "Retain users with machine-enhanced intelligence. Use Framed to predict when customers will leave and save them before they go.",
  "level": 3,
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
    "identify": true,
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
      "default": "https://intake.framed.io/segment",
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "alt": "https://s3.amazonaws.com/segmentio/logos/framedio-alt.png",
    "default": "https://s3.amazonaws.com/segmentio/logos/framedio-default.svg"
  },
  "id": "framed.io"
}

export const logos = {
  "alt": "https://s3.amazonaws.com/segmentio/logos/framedio-alt.png",
  "default": "https://s3.amazonaws.com/segmentio/logos/framedio-default.svg"
}

export default data
