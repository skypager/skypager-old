export const id = "bugsnag"

export const data = {
  "name": "Bugsnag",
  "slug": "bugsnag",
  "createdAt": "2013-05-14T23:02:41Z",
  "note": "",
  "website": "http://bugsnag.com",
  "description": "Bugsnag is an error tracking service for websites and mobile apps. It automatically captures any errors in your code so that you can find them and resolve them as quickly as possible.",
  "level": 2,
  "categories": [
    "Error and Performance Monitoring"
  ],
  "popularity": 0.009082063,
  "platforms": {
    "browser": true,
    "mobile": true,
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
  "advancedOptions": [
    "useSSL"
  ],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can find your API Key on your Bugsnag [Project Settings page](https://bugsnag.com/dashboard).",
      "label": "API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Bugsnag API Key."
        ],
        [
          "regexp",
          "^[a-z0-9]{32}$",
          "Please double check your API Key. It should be 32 characters long, and look something like this: `4933fdfc1f418e956f5e5472148759f0`."
        ]
      ]
    },
    "useSSL": {
      "default": true,
      "description": "Use SSL When Sending Data to Bugsnag",
      "label": "Use SSL",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/bugsnag-default.svg"
  },
  "id": "bugsnag"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/bugsnag-default.svg"
}

export default data
