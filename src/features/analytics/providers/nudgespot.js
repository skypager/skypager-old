export const id = "nudgespot"

export const data = {
  "name": "Nudgespot",
  "slug": "nudgespot",
  "createdAt": "2015-01-20T21:17:18.546Z",
  "note": "",
  "website": "http://www.nudgespot.com/",
  "description": "Nudgespot is the easiest way to trigger emails, SMS, push notifications or in-app messages to your customers, at the right time.",
  "level": 1,
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
    "clientApiKey",
    "apiKey"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "Your Server-side API Key can be found in your Nudgespot dashboard under Settings",
      "label": "Server-side API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Server-side API Key."
        ]
      ]
    },
    "clientApiKey": {
      "default": "",
      "description": "Your Javascript API Key can be found in your Nudgespot dashboard under Settings",
      "label": "Javascript API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Javascript API Key"
        ]
      ]
    },
    "direct": {
      "default": true,
      "private": true,
      "type": "boolean"
    },
    "endpoint": {
      "default": "https://api.nudgespot.com/partner/segment/api.json",
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/nudgespot-default.svg"
  },
  "id": "nudgespot"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/nudgespot-default.svg"
}

export default data
