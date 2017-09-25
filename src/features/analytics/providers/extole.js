export const id = "extole"

export const data = {
  "name": "Extole",
  "slug": "extole",
  "createdAt": "2015-01-05T21:17:18.546Z",
  "note": "",
  "website": "http://www.extole.com/",
  "description": "Extole is a referral marketing tool that helps marketers acquire new customers at scale by rewarding existing customers.",
  "level": 5,
  "categories": [
    "Referrals"
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
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "clientId",
    "events"
  ],
  "advancedOptions": [],
  "options": {
    "clientId": {
      "default": "",
      "description": "Your Extole client ID. To find your client ID, log in to <https://my.extole.com>, then choose \"Previous Tools\" from the dropdown menu at the top right. Next, select \"Sites\" from the \"Administer\" dropdown. From there, pick any of your Sites; your client ID will be listed at the top of the page.",
      "label": "Client ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Client ID."
        ],
        [
          "regexp",
          "^[0-9]+$",
          "Please double check your Client ID."
        ]
      ]
    },
    "events": {
      "description": "A mapping of custom events you'd like to pass through to Extole to the corresponding Extole event type.",
      "label": "Events",
      "options": [
        "purchase"
      ],
      "type": "map"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/extole-default.svg"
  },
  "id": "extole"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/extole-default.svg"
}

export default data
