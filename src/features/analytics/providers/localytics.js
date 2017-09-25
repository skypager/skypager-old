export const id = "localytics"

export const data = {
  "name": "Localytics",
  "slug": "localytics",
  "createdAt": "2013-05-14T23:02:41Z",
  "note": "",
  "website": "http://localytics.com",
  "description": "Localytics is a general-purpose mobile analytics tool that measures customer acquisition, ad attribution, retargeting campaigns and user actions in your mobile apps.",
  "level": 3,
  "categories": [
    "Analytics",
    "Push Notifications"
  ],
  "popularity": 0.0061628283,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": false
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": true,
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "appKey"
  ],
  "advancedOptions": [
    "sessionTimeoutInterval",
    "dimensions"
  ],
  "options": {
    "appKey": {
      "default": "",
      "description": "You can find your App Key in your Localytics [Settings page](http://www.localytics.com/).",
      "label": "App Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Localytics App Key."
        ],
        [
          "regexp",
          "^[a-z0-9]{23}-[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$",
          "Please double check your API Key. It should be 22 characters long, and look something like this: `3ccfac0c5c366f11105f26b-c8ab109c-b6e1-11e2-88e8-005cf8cbabd8`."
        ]
      ]
    },
    "dimensions": {
      "default": {},
      "description": "Localytics only accepts custom dimensions that have been pre-set in your app. Make sure to set these up in Localytics first, under Settings > Apps and then editing your app settings. You should then map the `trait` in an identify call or the `property` in a track call to the corresponding custom dimension you want to send. For e.g. you might map `gender` with custom dimension `0`. You can read more about custom dimensions [here](http://info.localytics.com/product-news/custom-dimensions-for-user-segmentation)",
      "label": "Custom Dimensions",
      "options": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "type": "map"
    },
    "sessionTimeoutInterval": {
      "default": -1,
      "description": "If an App stays in the background for more than this many seconds, start a new session when it returns to foreground.",
      "label": "Session Timeout Interval",
      "type": "number",
      "validators": [
        [
          "number",
          "Please double check your Timeout Interval. It should be a whole number."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/localytics-default.svg"
  },
  "id": "localytics"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/localytics-default.svg"
}

export default data
