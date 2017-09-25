export const id = "google-tag-manager"

export const data = {
  "name": "Google Tag Manager",
  "slug": "google-tag-manager",
  "createdAt": "2014-01-20T22:39:48Z",
  "note": "",
  "website": "https://www.google.com/tagmanager",
  "description": "Google Tag Manager lets you add or update your website tags, easily and for free.",
  "level": 1,
  "categories": [
    "Tag Managers"
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
    "identify": false,
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "containerId"
  ],
  "advancedOptions": [
    "trackAllPages",
    "trackNamedPages",
    "trackCategorizedPages"
  ],
  "options": {
    "containerId": {
      "default": "",
      "description": "You can find your Container ID in your [Accounts page](https://www.google.com/tagmanager/web/#management/Accounts/).",
      "label": "Container ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Google Tag Manager Container ID"
        ]
      ]
    },
    "trackAllPages": {
      "default": false,
      "description": "This will track events titled **'Loaded A Page'** to Google Tag Manager whenever you call our [`page` method](https://segment.io/libraries/analytics.js#page)",
      "label": "Track All Pages",
      "type": "boolean"
    },
    "trackCategorizedPages": {
      "default": false,
      "description": "This will track events to Google Tag Manager for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `category` associated with them. For example `page('Docs', 'Index')` would translate to **Viewed Docs Index Page**.",
      "label": "Track Categorized Pages",
      "type": "boolean"
    },
    "trackNamedPages": {
      "default": false,
      "description": "This will track events to Google Tag Manager for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `name` associated with them. For example `page('Signup')` would translate to **Viewed Signup Page**.",
      "label": "Track Named Pages",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/google-tag-manager-default.svg"
  },
  "id": "google-tag-manager"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/google-tag-manager-default.svg"
}

export default data
