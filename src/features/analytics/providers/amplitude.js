export const id = "amplitude"

export const data = {
  "name": "Amplitude",
  "slug": "amplitude",
  "createdAt": "2013-05-14T23:02:41Z",
  "note": "",
  "website": "http://amplitude.com",
  "description": "Amplitude is an event tracking and segmentation tool for your mobile apps. By analyzing the actions your users perform you can gain a better understanding of how they use your app.",
  "level": 3,
  "categories": [
    "Analytics"
  ],
  "popularity": 0.0022705158,
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
    "apiKey"
  ],
  "advancedOptions": [
    "trackNamedPages",
    "trackCategorizedPages",
    "trackAllPages",
    "trackUtmProperties"
  ],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can find your API Key on your Amplitude [Settings page](https://amplitude.com/settings).",
      "label": "API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your API Key."
        ],
        [
          "regexp",
          "^[a-z0-9]{32}$",
          "Please double check your API Key. It should be 32 characters long, and look something like this: `3cb9b589437d3904f19b2b791c2cdada`."
        ]
      ]
    },
    "trackAllPages": {
      "default": false,
      "description": "This will track **Loaded a Page** events to Amplitude for all [`page` method](https://segment.io/libraries/analytics.js#page) calls. We keep this disabled by default, since Amplitude isn't generally used for pageview tracking.",
      "label": "Track All Pages to Amplitude",
      "type": "boolean"
    },
    "trackCategorizedPages": {
      "default": true,
      "description": "This will track events to Amplitude for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `category` associated with them. For example `page('Docs', 'Index')` would translate to **Viewed Docs Page**.",
      "label": "Track Categorized Pages to Amplitude",
      "type": "boolean"
    },
    "trackNamedPages": {
      "default": true,
      "description": "This will track events to Amplitude for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `name` associated with them. For example `page('Signup')` would translate to **Viewed Signup Page**.",
      "label": "Track Named Pages to Amplitude",
      "type": "boolean"
    },
    "trackUtmProperties": {
      "default": true,
      "description": "This will track UTM properties found in the querystring to Amplitude",
      "label": "Track UTM Properties to Amplitude",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "alt": "https://s3.amazonaws.com/segmentio/logos/amplitude-alt.png",
    "default": "https://s3.amazonaws.com/segmentio/logos/amplitude-default.svg"
  },
  "id": "amplitude"
}

export const logos = {
  "alt": "https://s3.amazonaws.com/segmentio/logos/amplitude-alt.png",
  "default": "https://s3.amazonaws.com/segmentio/logos/amplitude-default.svg"
}

export default data
