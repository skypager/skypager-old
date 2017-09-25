export const id = "trak.io"

export const data = {
  "name": "trak.io",
  "slug": "trak.io",
  "createdAt": "2013-09-19T23:19:49Z",
  "note": "",
  "website": "http://trak.io",
  "description": "trak.io is an event and customer tracking tool targeted at startups that gives you individual profiles for each of your customers, complete with everything they do in your app.",
  "level": 3,
  "categories": [
    "Analytics",
    "Customer Success",
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
    "token"
  ],
  "advancedOptions": [
    "trackNamedPages",
    "trackCategorizedPages",
    "trackAllPages"
  ],
  "options": {
    "token": {
      "default": "",
      "description": "Your trak.io token",
      "label": "Token",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your trak.io token."
        ],
        [
          "regexp",
          "^[a-f0-9]{40}$",
          "Please double check your token; it looks like it's misspelled. It should be a 40-character hexadecimal number."
        ]
      ]
    },
    "trackAllPages": {
      "default": false,
      "description": "This will track **Loaded a Page** events to trak.io for all [`page` method](https://segment.io/libraries/analytics.js#page) calls. We keep this disabled by default, since trak.io isn't generally used for pageview tracking.",
      "label": "Track All Pages to trak.io",
      "type": "boolean"
    },
    "trackCategorizedPages": {
      "default": false,
      "description": "This will track events to trak.io for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `category` associated with them. For example `page('Docs', 'Index')` would translate to **Viewed Docs Page**.",
      "label": "Track Categorized Pages to trak.io",
      "type": "boolean"
    },
    "trackNamedPages": {
      "default": false,
      "description": "This will track events to trak.io for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `name` associated with them. For example `page('Signup')` would translate to **Viewed Signup Page**.",
      "label": "Track Named Pages to trak.io",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/trakio-default.svg"
  },
  "id": "trak.io"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/trakio-default.svg"
}

export default data
