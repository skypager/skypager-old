export const id = "userlike"

export const data = {
  "name": "Userlike",
  "slug": "userlike",
  "createdAt": "2015-01-20T20:17:18.546Z",
  "note": "",
  "website": "http://www.userlike.com/",
  "description": "Userlike offers a professional and lightweight live chat software for websites.",
  "level": 1,
  "categories": [
    "Livechat"
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
    "track": false
  },
  "basicOptions": [
    "secretKey"
  ],
  "advancedOptions": [
    "listen"
  ],
  "options": {
    "listen": {
      "default": false,
      "description": "Automatically send Live Chat message events, conversation starts and ends to other tools you have enabled.",
      "label": "Record live chat events.",
      "type": "boolean"
    },
    "secretKey": {
      "default": "",
      "description": "Your Secret Key can be found under Config > Install > Secret. It should look something like 8a3707ab96df8354253c158a25f908b84dc655c27d5828a1a97d99f08bfba6f4.",
      "label": "Secret Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Secret Key"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/userlike-default.svg"
  },
  "id": "userlike"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/userlike-default.svg"
}

export default data
