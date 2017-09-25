export const id = "mixpanel"

export const data = {
  "name": "Mixpanel",
  "slug": "mixpanel",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://mixpanel.com",
  "description": "Mixpanel is an event tracking tool targeted at web apps with lots of features: funnel, retention and people tracking; advanced segmentation; and sending email and notifications.",
  "level": 1,
  "categories": [
    "Analytics",
    "Email",
    "Surveys",
    "Push Notifications"
  ],
  "popularity": 0.11935452,
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
    "token",
    "apiKey",
    "people"
  ],
  "advancedOptions": [
    "trackNamedPages",
    "trackCategorizedPages",
    "trackAllPages",
    "crossSubdomainCookie",
    "secureCookie",
    "increments"
  ],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can find your API Key under **Account** in the upper-right of the [Mixpanel interface](https://mixpanel.com).",
      "label": "API Key",
      "private": true,
      "type": "string",
      "validators": [
        [
          "regexp",
          "^[a-f0-9]{32}$",
          "Please double check your API Key; it looks like it's misspelled. It should be a 32 character hexadecimal number."
        ]
      ]
    },
    "crossSubdomainCookie": {
      "default": false,
      "description": "This will allow the Mixpanel cookie to persist between different pages of your application.",
      "label": "Cross Subdomain Cookie",
      "type": "boolean"
    },
    "increments": {
      "default": [],
      "description": "If you want to see and segment by event counts and last event date in Mixpanel people, enable people, and then list the events you want to see in People here.",
      "label": "Events to increment in People",
      "type": "array"
    },
    "legacySuperProperties": {
      "default": false,
      "description": "We used to add $ to mixpanel traits as super properties. This fixes that: https://github.com/segmentio/integrations/pull/124/files",
      "type": "boolean"
    },
    "people": {
      "default": false,
      "description": "This will send all of your [identify](https://segment.io/docs/methods/identify) calls to Mixpanel's People feature. We disable this setting by default since People is a paid add-on to Mixpanel.",
      "label": "Use Mixpanel People",
      "type": "boolean"
    },
    "secureCookie": {
      "default": false,
      "description": "This will mark the Mixpanel cookie as secure, meaning it will only be transmitted over https",
      "label": "Secure Cookie",
      "type": "boolean"
    },
    "token": {
      "default": "",
      "description": "You can find your token under **Account** in the upper-right of the [Mixpanel interface](https://mixpanel.com).",
      "label": "Token",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Mixpanel token."
        ],
        [
          "regexp",
          "^[a-f0-9]{32}$",
          "Please double check your token; it looks like it's misspelled. It should be a 32 character hexadecimal number."
        ]
      ]
    },
    "trackAllPages": {
      "default": false,
      "description": "This will track **Loaded a Page** events to Mixpanel for all [`page` method](https://segment.io/libraries/analytics.js#page) calls. We keep this disabled by default, since Mixpanel isn't generally used for pageview tracking.",
      "label": "Track All Pages to Mixpanel",
      "type": "boolean"
    },
    "trackCategorizedPages": {
      "default": true,
      "description": "This will track events to Mixpanel for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `category` associated with them. For example `page('Docs', 'Index')` would translate to **Viewed Docs Index Page**.",
      "label": "Track Categorized Pages to Mixpanel",
      "type": "boolean"
    },
    "trackNamedPages": {
      "default": true,
      "description": "This will track events to Mixpanel for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `name` associated with them. For example `page('Signup')` would translate to **Viewed Signup Page**.",
      "label": "Track Named Pages to Mixpanel",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/mixpanel-default.svg"
  },
  "id": "mixpanel"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/mixpanel-default.svg"
}

export default data
