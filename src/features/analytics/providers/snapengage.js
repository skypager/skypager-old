export const id = "snapengage"

export const data = {
  "name": "SnapEngage",
  "slug": "snapengage",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "https://www.snapengage.com/partner?t=signup&ref=segment-io",
  "description": "SnapEngage is a live chat tool that lets you have conversations with visitors who are currently on your site, so you can help with any problems they might be having.",
  "level": 2,
  "categories": [
    "Livechat"
  ],
  "popularity": 0.009082063,
  "platforms": {
    "browser": true,
    "mobile": false,
    "server": false
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": true,
    "pageview": false,
    "track": false
  },
  "basicOptions": [
    "apiKey"
  ],
  "advancedOptions": [
    "listen"
  ],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can find your Widget ID in your SnapEngage Javascript snippet. It will look something like this: `0c739ebb-2016-44a0-b1da-a5b5eb272474`. It can also be found under the Advanced Widget ID section of the Get the Code tab in the Admin Dashboard when logged in to SnapEngage.",
      "label": "Widget ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your SnapEngage Widget ID."
        ],
        [
          "regexp",
          "^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$",
          "Please double check your Widget ID. It should look something like this: `92159bc9-edee-4c53-a4b2-7118f8b7b457`."
        ]
      ]
    },
    "listen": {
      "default": false,
      "description": "Automatically send Live Chat message events, conversation starts and ends to other tools you have enabled.",
      "label": "Record live chat events.",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/snapengage-default.svg"
  },
  "id": "snapengage"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/snapengage-default.svg"
}

export default data
