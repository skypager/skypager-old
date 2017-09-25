export const id = "interstate-analytics"

export const data = {
  "name": "Interstate Analytics",
  "slug": "interstate-analytics",
  "createdAt": "2015-04-03T16:01:12Z",
  "note": "",
  "website": "https://interstateanalytics.com",
  "description": "Interstate helps marketers understand their ROI across all channels, campaigns, and devices in a single dashboard, so they can make better marketing spend decisions.",
  "level": 1,
  "categories": [
    "Advertising",
    "Analytics"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": true,
    "group": false,
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
      "default": "https://api.interstateanalytics.com/api/tracking/events/segment",
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/interstate-analytics-default.svg"
  },
  "id": "interstate-analytics"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/interstate-analytics-default.svg"
}

export default data
