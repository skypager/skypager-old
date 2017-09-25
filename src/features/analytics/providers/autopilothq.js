export const id = "autopilothq"

export const data = {
  "name": "AutopilotHQ",
  "slug": "autopilothq",
  "createdAt": "2015-03-27T23:01:12.274Z",
  "note": "",
  "website": "https://autopilothq.com/",
  "description": "Autopilot is easy-to-use software for multi-channel marketing automation",
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
    "alias": true,
    "group": true,
    "identify": true,
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
      "default": "https://api.autopilothq.com/segment",
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/autopilothq-default.svg"
  },
  "id": "autopilothq"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/autopilothq-default.svg"
}

export default data
