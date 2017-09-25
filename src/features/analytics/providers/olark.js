export const id = "olark"

export const data = {
  "name": "Olark",
  "slug": "olark",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://www.olark.com/?r=qhl4tltg",
  "description": "Olark is a live chat widget for your website's visitors. It helps with both customer support and sales, since the chat widget is available right when your user needs help.",
  "level": 2,
  "categories": [
    "Livechat"
  ],
  "popularity": 0.056762893,
  "platforms": {
    "browser": true,
    "mobile": false,
    "server": false
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": true,
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "siteId",
    "groupId"
  ],
  "advancedOptions": [
    "identify",
    "track",
    "page",
    "listen"
  ],
  "options": {
    "groupId": {
      "default": "",
      "description": "If you want to use Olark across multiple different websites under the same account, create an Olark Group and add the ID here.",
      "label": "Group ID",
      "type": "string"
    },
    "identify": {
      "default": true,
      "description": "Show the user's name or email from analytics.identify() in the Olark chat console",
      "label": "Show the user's name or email chat console",
      "type": "boolean"
    },
    "listen": {
      "default": false,
      "description": "Automatically send Live Chat message events, conversation starts and ends to other tools you have enabled.",
      "label": "Record live chat events.",
      "type": "boolean"
    },
    "page": {
      "default": false,
      "description": "Log pageviews to the Olark chat console",
      "label": "Log pageviews to the Olark chat console",
      "type": "boolean"
    },
    "siteId": {
      "default": "",
      "description": "You can find your Site ID on the [Olark Install page](https://www.olark.com/install?r=qhl4tltg). It should look something like this: `9385-174-10-1457`.",
      "label": "Site ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Olark Site-ID."
        ],
        [
          "regexp",
          "^\\d+-\\d+-\\d+-\\d+$",
          "Please double check your Site ID. It should look something like this: `9385-174-10-1457`."
        ]
      ]
    },
    "track": {
      "default": false,
      "description": "Log custom events from analytics.track() to the Olark chat console",
      "label": "Log custom events from analytics.track() to the Olark chat console",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/olark-default.svg"
  },
  "id": "olark"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/olark-default.svg"
}

export default data
