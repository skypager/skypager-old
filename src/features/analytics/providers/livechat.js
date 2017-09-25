export const id = "livechat"

export const data = {
  "name": "LiveChat",
  "slug": "livechat",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://www.livechatinc.com/?partner=PTnAKQxAJq",
  "description": "LiveChat is a live chat tool (who'd have thought?!) that lets you have direct conversations with the visitors browsing around your site right when they need you.",
  "level": 2,
  "categories": [
    "Livechat"
  ],
  "popularity": 0.0055141095,
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
    "track": false
  },
  "basicOptions": [
    "license"
  ],
  "advancedOptions": [
    "group",
    "listen"
  ],
  "options": {
    "group": {
      "default": "0",
      "description": "You can divide LiveChat agents into different groups such as \"Billing\" or \"Support\"",
      "label": "Group",
      "type": "string",
      "validators": [
        [
          "regexp",
          "^\\d+$",
          "Double-check the Group. It should be a number."
        ]
      ]
    },
    "license": {
      "default": "",
      "description": "You can find your License key in your LiveChat Javascript snippet on the **Settings > Installation** page. Or, if you're just signing up, it's right in the setup guide!",
      "label": "License",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your LiveChat License."
        ],
        [
          "regexp",
          "^\\d+$",
          "Double-check your License. It should be a series of numbers, like `9105741`."
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
    "default": "https://s3.amazonaws.com/segmentio/logos/livechat-default.svg"
  },
  "id": "livechat"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/livechat-default.svg"
}

export default data
