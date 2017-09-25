export const id = "leanplum"

export const data = {
  "name": "Leanplum",
  "slug": "leanplum",
  "createdAt": "2014-10-06T07:17:41Z",
  "note": "",
  "website": "http://www.leanplum.com",
  "description": "Leanplum enables mobile teams to quickly go from insight to action using the lean cycle of releasing, analyzing and optimizing content and messaging.",
  "level": 3,
  "categories": [
    "A/B Testing",
    "Push Notifications"
  ],
  "popularity": 0,
  "platforms": {
    "browser": false,
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
    "appId",
    "clientKey",
    "gcmSenderId",
    "useLeanplumSenderId"
  ],
  "advancedOptions": [],
  "options": {
    "appId": {
      "default": "",
      "description": "The application ID. To find yours, select your app in the navigation column, and click Edit Apps. Under Keys, click Show.",
      "label": "Leanplum Application Id",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Leanplum app id."
        ]
      ]
    },
    "clientKey": {
      "default": "",
      "description": "Either the Production or Development keys, depending on which API call you want to make.",
      "label": "Leanplum Client Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Leanplum client key."
        ]
      ]
    },
    "gcmSenderId": {
      "default": "",
      "description": "The GCM sender ID that should be used for Push Notifications.",
      "label": "GCM Sender ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your GCM sender ID."
        ]
      ]
    },
    "useLeanplumSenderId": {
      "default": false,
      "description": "Select this if you don't have your own GCM Sender ID, and would like to use Leanplum's built in sender ID instead. If you have set your own GCM Sender ID and enable this setting, both IDs will be used.",
      "label": "Use Leanplum Sender ID",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/leanplum-default.svg"
  },
  "id": "leanplum"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/leanplum-default.svg"
}

export default data
