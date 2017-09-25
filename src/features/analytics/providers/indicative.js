export const id = "indicative"

export const data = {
  "name": "Indicative",
  "slug": "indicative",
  "createdAt": "2014-09-17T01:25:26Z",
  "note": "",
  "website": "http://indicative.com",
  "description": "Indicative offers free analytics for mobile and web businesses to make smarter, data-driven decisions",
  "level": 1,
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
    "alias": false,
    "group": false,
    "identify": false,
    "pageview": false,
    "screen": true,
    "track": true
  },
  "basicOptions": [
    "apiKey"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can find your Indicative API Key in your Project Settings inside the Indicative app.",
      "label": "API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your API Key"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/indicative-default.svg"
  },
  "id": "indicative"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/indicative-default.svg"
}

export default data
