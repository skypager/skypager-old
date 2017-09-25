export const id = "countly"

export const data = {
  "name": "Countly",
  "slug": "countly",
  "createdAt": "2013-05-14T23:02:41Z",
  "note": "",
  "website": "http://count.ly",
  "description": "Countly is a general-purpose analytics tool for your mobile apps, with reports like traffic sources, demographics, event tracking and segmentation.",
  "level": 1,
  "categories": [
    "Analytics",
    "Realtime Dashboards"
  ],
  "popularity": 0.009082063,
  "platforms": {
    "browser": false,
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
    "appKey",
    "serverUrl"
  ],
  "advancedOptions": [],
  "options": {
    "appKey": {
      "default": "",
      "description": "You can find your App Key on Countly's [Manage Applications page](https://cloud.count.ly/dashboard#/manage/apps). It should be 40 characters long, and look something like this: `c801156663bfcc4694aafc0dd26023a6d9b9544a`.",
      "label": "App Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Countly App Key."
        ],
        [
          "regexp",
          "^[a-z0-9]{40}$",
          "Please double check your API Key. It should be 40 characters long, and look something like this: `c801156663bfcc4694aafc0dd26023a6d9b9544a`."
        ]
      ]
    },
    "serverUrl": {
      "default": "https://cloud.count.ly",
      "description": "If you're using Countly Cloud your Server URL is `https://cloud.count.ly`. If not, you'll need to add your own URL here.",
      "label": "Server URL",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter a Server URL."
        ],
        [
          "url",
          "Please double-check that your Server URL is valid. It should start with `http://` or `https://`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/countly-default.svg"
  },
  "id": "countly"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/countly-default.svg"
}

export default data
