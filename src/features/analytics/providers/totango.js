export const id = "totango"

export const data = {
  "name": "Totango",
  "slug": "totango",
  "createdAt": "2013-05-04T00:14:32Z",
  "note": "",
  "website": "http://totango.com",
  "description": "Totango is an analytics tool targeted at SaaS companies that keeps track of 'accounts' in addition to individual users, and helps you notice when certain accounts might churn.",
  "level": 4,
  "categories": [
    "Customer Success"
  ],
  "popularity": 0.0048653907,
  "platforms": {
    "browser": true,
    "mobile": false,
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
    "serviceId"
  ],
  "advancedOptions": [
    "trackNamedPages",
    "trackCategorizedPages",
    "disableHeartbeat"
  ],
  "options": {
    "disableHeartbeat": {
      "default": false,
      "description": "By default Totango's Javascript pings its servers once a minute to see if the user has left the page. If you don't want that to happen, enable this setting.",
      "label": "Disable the Totango Heartbeat",
      "type": "boolean"
    },
    "serviceId": {
      "default": "",
      "description": "You can find your Service ID under **Settings > Developer Console** in [Totango](https://app.totango.com/#!/integration/developerConsole).",
      "label": "Service ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Service ID."
        ],
        [
          "regexp",
          "^SP-\\d{4}-\\d{2}$",
          "Please double check your Service ID. It should look something like this: `SP-9697-01`."
        ]
      ]
    },
    "trackCategorizedPages": {
      "default": true,
      "description": "This will track events to Totango for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `category` associated with them. For example `page('Docs', 'Index')` would translate to **Viewed Docs Page**.",
      "label": "Track Categorized Pages to Totango",
      "type": "boolean"
    },
    "trackNamedPages": {
      "default": true,
      "description": "This will track events to Totango for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `name` associated with them. For example `page('Signup')` would translate to **Viewed Signup Page**.",
      "label": "Track Named Pages to Totango",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/totango-default.svg"
  },
  "id": "totango"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/totango-default.svg"
}

export default data
