export const id = "keen-io"

export const data = {
  "name": "Keen IO",
  "slug": "keen-io",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://keen.io",
  "description": "Keen IO is an analytics API that tracks user actions and lets you embed graphs directly into your application, or into your internal company dashboards.",
  "level": 1,
  "categories": [
    "Analytics",
    "Raw Data",
    "Error and Performance Monitoring",
    "Attribution"
  ],
  "popularity": 0.062277004,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": true,
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "projectId",
    "writeKey"
  ],
  "advancedOptions": [
    "readKey",
    "trackNamedPages",
    "trackCategorizedPages",
    "trackAllPages",
    "ipAddon",
    "uaAddon",
    "urlAddon",
    "referrerAddon"
  ],
  "options": {
    "initialPageview": {
      "default": false,
      "description": "This will send an intial 'Loaded a Page' event to Keen IO when the page is loaded. We disable this by default since Keen IO is generally used for custom event tracking, not pageviews. _Note: you must also have the **Send Pageview Events** setting enabled for this to work._",
      "label": "Track an Initial Pageview",
      "type": "boolean"
    },
    "ipAddon": {
      "default": false,
      "description": "Enable this to use Keen IO's data enrichment feature to add geographic information based on IP.",
      "label": "Geo IP Addon",
      "type": "boolean"
    },
    "projectId": {
      "default": "",
      "description": "Your project ID. It should be 24 characters long, and look something like this: `9181bcd23843312d87000000`.",
      "label": "Project ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Project ID."
        ],
        [
          "regexp",
          "^[a-z0-9]{24}$",
          "Please double check your Project ID. It should be 24 characters long, and look something like this: `9181bcd23843312d87000000`."
        ]
      ]
    },
    "readKey": {
      "default": "",
      "description": "Your read key should be 224 characters long and made up of numbers and letters only.",
      "label": "Read Key",
      "type": "string",
      "validators": [
        [
          "regexp",
          "^[a-z0-9]{224}$",
          "Please double check your Read Key. It should be 224 characters long and made up of numbers and letters only."
        ]
      ]
    },
    "referrerAddon": {
      "default": false,
      "description": "Enable this to use the Keen IO's data enrichment feature for parsing referrer URLs into their source.",
      "label": "Referrer Parsing Addon",
      "type": "boolean"
    },
    "trackAllPages": {
      "default": true,
      "description": "This will track **Loaded a Page** events to Keen IO for all [`page` method](https://segment.io/libraries/analytics.js#page) calls.",
      "label": "Track All Pages to Keen IO",
      "type": "boolean"
    },
    "trackCategorizedPages": {
      "default": true,
      "description": "This will track events to Keen IO for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `category` associated with them. For example `page('Docs', 'Index')` would translate to **Viewed Docs Page**.",
      "label": "Track Categorized Pages to Keen IO",
      "type": "boolean"
    },
    "trackNamedPages": {
      "default": true,
      "description": "This will track events to Keen IO for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `name` associated with them. For example `page('Signup')` would translate to **Viewed Signup Page**.",
      "label": "Track Named Pages to Keen IO",
      "type": "boolean"
    },
    "uaAddon": {
      "default": false,
      "description": "Enable this to use the Keen IO's data enrichment to parse UserAgent strings.",
      "label": "UserAgent Addon",
      "type": "boolean"
    },
    "urlAddon": {
      "default": false,
      "description": "Enable this to use the Keen IO's data enrichment feature for parsing URLs into its components for easier filtering.",
      "label": "URL Parsing Addon",
      "type": "boolean"
    },
    "writeKey": {
      "default": "",
      "description": "Your write key should be 224 characters long and made up of numbers and letters only.",
      "label": "Write Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Write Key."
        ],
        [
          "regexp",
          "^[a-z0-9]{224}$",
          "Please double check your Write Key. It should be 224 characters long and made up of numbers and letters only."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/keen-io-default.svg"
  },
  "id": "keen-io"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/keen-io-default.svg"
}

export default data
