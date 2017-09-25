export const id = "frontleaf"

export const data = {
  "name": "Frontleaf",
  "slug": "frontleaf",
  "createdAt": "2014-06-01T23:02:41Z",
  "note": "",
  "website": "http://www.frontleaf.com/",
  "description": "Frontleaf is built to help you analyze and reduce churn.",
  "level": 3,
  "categories": [
    "Customer Success"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": true,
    "identify": true,
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "token",
    "stream"
  ],
  "advancedOptions": [
    "baseUrl",
    "trackNamedPages",
    "trackCategorizedPages"
  ],
  "options": {
    "baseUrl": {
      "default": "https://api.frontleaf.com",
      "description": "The API endpoint url, defaults to Frontleaf's cloud hosted service.",
      "label": "Base URL",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Frontleaf Base URL"
        ]
      ]
    },
    "stream": {
      "default": "",
      "description": "Streams are generally the environment like `development` or `production`.",
      "label": "Stream",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Frontleaf Stream"
        ]
      ]
    },
    "token": {
      "default": "",
      "description": "Your API Token can be found in your Frontleaf account.",
      "label": "API Token",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Frontleaf API Token"
        ]
      ]
    },
    "trackCategorizedPages": {
      "default": false,
      "description": "This will track events to Frontleaf for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `category` associated with them. For example `page('Docs', 'Index')` would translate to **Viewed Docs Page**.",
      "label": "Track Categorized Pages to Frontleaf",
      "type": "boolean"
    },
    "trackNamedPages": {
      "default": false,
      "description": "This will track events to Frontleaf for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `name` associated with them. For example `page('Signup')` would translate to **Viewed Signup Page**.",
      "label": "Track Named Pages to Frontleaf",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/frontleaf-default.svg"
  },
  "id": "frontleaf"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/frontleaf-default.svg"
}

export default data
