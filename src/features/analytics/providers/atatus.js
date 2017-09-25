export const id = "atatus"

export const data = {
  "name": "Atatus",
  "slug": "atatus",
  "createdAt": "2015-01-21T01:05:01Z",
  "note": "",
  "website": "https://www.atatus.com/",
  "description": "Atatus provides Real User Monitoring (RUM) and advanced error tracking for modern websites.",
  "level": 1,
  "categories": [
    "Error and Performance Monitoring"
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
    "identify": true,
    "pageview": false,
    "track": false
  },
  "basicOptions": [
    "apiKey"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "To find your API Key first create a project in your Atatus dashboard. The key should look like 16ae323d8b3244733a981215c9d66e67d",
      "label": "API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Atatus API Key"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/atatus-default.svg"
  },
  "id": "atatus"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/atatus-default.svg"
}

export default data
