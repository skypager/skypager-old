export const id = "outbound"

export const data = {
  "name": "Outbound",
  "slug": "outbound",
  "createdAt": "2013-05-14T23:02:41Z",
  "note": "",
  "website": "http://outbound.io",
  "description": "Outbound makes it easy to send email, push notifications, SMS and voice messages when you need your users to take an action - then test how well each message works.",
  "level": 3,
  "categories": [
    "Email",
    "Push Notifications"
  ],
  "popularity": 0.0045410316,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": true,
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "apiKey",
    "publicApiKey"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can find your Private Key on the Outbound Settings > Environments page. It should be 32 characters long, and look something like this: `f4f15f2f004fa0bd2140b4db93cbb538`.",
      "label": "Private Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Outbound Private Key."
        ],
        [
          "regexp",
          "^[a-f0-9]{32}$",
          "Please double check your Private Key. It should be 32 characters long, and look something like this: `f4f15f2f004fa0bd2140b4db93cbb538`."
        ]
      ]
    },
    "publicApiKey": {
      "default": "",
      "description": "You can find your Public Key on the Outbound Settings > Environments page.",
      "label": "Public Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Outbound Public Key."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/outbound-default.svg"
  },
  "id": "outbound"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/outbound-default.svg"
}

export default data
