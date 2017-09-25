export const id = "seg"

export const data = {
  "name": "Seg",
  "slug": "seg",
  "createdAt": "2015-06-12T21:18:14.062Z",
  "note": "",
  "website": "http://getseg.com/",
  "description": "Seg generates clever profiles for your customers from your orders, website traffic and email clicks which you can use to send relevant emails through your existing email software.",
  "level": 3,
  "categories": [
    "Email"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": true,
    "group": false,
    "identify": true,
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "apiKey"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can find your Website Id under your Seg app settings > Web tracking code. It should look like `abc8fb18-7559-4324-9921-a4b5015b4a1c`. Note that you do not need to install any extra tracking code.",
      "label": "Website Id",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Website Id"
        ]
      ]
    },
    "direct": {
      "default": true,
      "private": true,
      "type": "boolean"
    },
    "endpoint": {
      "default": "https://tracker.segapp.com",
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "alt": "https://s3.amazonaws.com/segmentio/logos/seg-alt.png",
    "default": "https://s3.amazonaws.com/segmentio/logos/seg-default.svg"
  },
  "id": "seg"
}

export const logos = {
  "alt": "https://s3.amazonaws.com/segmentio/logos/seg-alt.png",
  "default": "https://s3.amazonaws.com/segmentio/logos/seg-default.svg"
}

export default data
