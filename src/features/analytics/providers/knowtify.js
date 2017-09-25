export const id = "knowtify"

export const data = {
  "name": "Knowtify",
  "slug": "knowtify",
  "createdAt": "2015-02-20T14:39:01Z",
  "note": "",
  "website": "http://www.knowtify.io/",
  "description": "Knowtify.io helps software application makers and marketers create and manage smart, personalized digest emails for their user base.",
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
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "apiToken"
  ],
  "advancedOptions": [],
  "options": {
    "apiToken": {
      "default": "",
      "description": "You can find your Knowtify API token under your Account page",
      "label": "API token",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter an API token"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/knowtify-default.svg"
  },
  "id": "knowtify"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/knowtify-default.svg"
}

export default data
