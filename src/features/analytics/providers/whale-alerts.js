export const id = "whale-alerts"

export const data = {
  "name": "Whale Alerts",
  "slug": "whale-alerts",
  "createdAt": "2015-04-10T16:01:12Z",
  "note": "",
  "website": "http://whalealerts.com",
  "description": "Proactively monitor your sales pipeline and get alerted when prospects show buying behavior.",
  "level": 1,
  "categories": [
    "CRMs"
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
      "label": "CustomerID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your CustomerID"
        ]
      ]
    },
    "direct": {
      "default": true,
      "private": true,
      "type": "boolean"
    },
    "endpoint": {
      "default": "https://webhooks.whalr.com:3001/v2",
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/whale-alerts-default.svg"
  },
  "id": "whale-alerts"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/whale-alerts-default.svg"
}

export default data
