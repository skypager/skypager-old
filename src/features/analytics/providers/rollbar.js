export const id = "rollbar"

export const data = {
  "name": "Rollbar",
  "slug": "rollbar",
  "createdAt": "2013-11-13T03:54:21Z",
  "note": "",
  "website": "http://rollbar.com",
  "description": "Rollbar is a simple way to collect Javascript errors on your website, so that you can see which errors your users are encountering and get them fixed right away.",
  "level": 2,
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
    "accessToken"
  ],
  "advancedOptions": [
    "identify",
    "environment",
    "captureUncaught"
  ],
  "options": {
    "accessToken": {
      "default": "",
      "description": "Your Rollbar access token",
      "label": "Access Token",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Rollbar Access Token."
        ]
      ]
    },
    "captureUncaught": {
      "default": true,
      "description": "Record uncaught exceptions from `window.onerror`.",
      "label": "Capture uncaught exceptions",
      "type": "boolean"
    },
    "environment": {
      "default": "",
      "description": "The environment the code is running in.",
      "label": "Environment",
      "type": "string"
    },
    "identify": {
      "default": true,
      "description": "When this option is enabled we will store metadata about the user on `identify` calls.",
      "label": "Include custom user data with Rollbar's error tracking",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/rollbar-default.svg"
  },
  "id": "rollbar"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/rollbar-default.svg"
}

export default data
