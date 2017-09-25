export const id = "sentry"

export const data = {
  "name": "Sentry",
  "slug": "sentry",
  "createdAt": "2013-03-29T01:05:01Z",
  "note": "",
  "website": "http://getsentry.com",
  "description": "Sentry is an error reporting and logging tool that automatically collects Javascript errors on your site and helps you manage and fix them quickly.",
  "level": 2,
  "categories": [
    "Error and Performance Monitoring"
  ],
  "popularity": 0.033733375,
  "platforms": {
    "browser": true,
    "mobile": false,
    "server": false
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": false,
    "pageview": false,
    "track": false
  },
  "basicOptions": [
    "config"
  ],
  "advancedOptions": [],
  "options": {
    "config": {
      "default": "",
      "description": "You can find your Configuration URL under the **Client Configuration: Javascript** tab on your [Sentry Project page](https://getsentry.com/). You should enter the URL that's passed as the parameter to `Raven.config()`.",
      "label": "Configuration URL",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Sentry Configuration URL."
        ],
        [
          "url",
          "Please double check your Configuration URL. It should start with `https://`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/sentry-default.svg"
  },
  "id": "sentry"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/sentry-default.svg"
}

export default data
