export const id = "tapstream"

export const data = {
  "name": "Tapstream",
  "slug": "tapstream",
  "createdAt": "2013-09-26T19:56:31Z",
  "note": "",
  "website": "http://tapstream.com",
  "description": "Tapstream is a mobile attribution tool that lets you attribute app installs to individual users who have visited your website, so your marketing team can know what's working.",
  "level": 3,
  "categories": [
    "Attribution"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": false
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": false,
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "accountName",
    "sdkSecret"
  ],
  "advancedOptions": [
    "trackNamedPages",
    "trackCategorizedPages",
    "trackAllPages"
  ],
  "options": {
    "accountName": {
      "default": "",
      "description": "Your Tapstream account name",
      "label": "Account Name",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Tapstream Account Name."
        ]
      ]
    },
    "sdkSecret": {
      "default": "",
      "description": "This is a required property if you want to send Tapstream data from our mobile SDKs.",
      "label": "SDK Secret",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Tapstream SDK Secret."
        ]
      ]
    },
    "trackAllPages": {
      "default": true,
      "description": "This will track **Loaded a Page** events to Tapstream for all [`page` method](https://segment.io/libraries/analytics.js#page) calls.",
      "label": "Track All Pages to Tapstream",
      "type": "boolean"
    },
    "trackCategorizedPages": {
      "default": true,
      "description": "This will track events to Tapstream for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `category` associated with them. For example `page('Docs', 'Index')` would translate to **Viewed Docs Page**.",
      "label": "Track Categorized Pages to Tapstream",
      "type": "boolean"
    },
    "trackNamedPages": {
      "default": true,
      "description": "This will track events to Tapstream for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `name` associated with them. For example `page('Signup')` would translate to **Viewed Signup Page**.",
      "label": "Track Named Pages to Tapstream",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/tapstream-default.svg"
  },
  "id": "tapstream"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/tapstream-default.svg"
}

export default data
