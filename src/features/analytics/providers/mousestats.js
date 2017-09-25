export const id = "mousestats"

export const data = {
  "name": "MouseStats",
  "slug": "mousestats",
  "createdAt": "2013-09-19T23:19:49Z",
  "note": "",
  "website": "http://mousestats.com",
  "description": "MouseStats is a user testing tool that lets you record a few of your visitor's browsing sessions and see heatmaps for buttons and forms so you fix the confusing parts of your site.",
  "level": 2,
  "categories": [
    "Heatmaps and Recordings"
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
    "accountNumber"
  ],
  "advancedOptions": [],
  "options": {
    "accountNumber": {
      "default": "",
      "description": "Your account number should be a series of numbers, like `9532375730335616295`.",
      "label": "Account Number",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your MouseStats Account Number."
        ],
        [
          "regexp",
          "^[0-9]+$",
          "Double-check your Account Number. It should be a series of numbers, like `9532375730335616295`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/mousestats-default.svg"
  },
  "id": "mousestats"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/mousestats-default.svg"
}

export default data
