export const id = "evergage"

export const data = {
  "name": "Evergage",
  "slug": "evergage",
  "createdAt": "2013-11-13T03:54:21Z",
  "note": "",
  "website": "http://evergage.com",
  "description": "Evergage is a tool that lets you add personalization to your website depending on what segments a user falls into, so you can show people custom messages when they need them.",
  "level": 3,
  "categories": [
    "Email",
    "Analytics"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": false,
    "server": false
  },
  "methods": {
    "alias": false,
    "group": true,
    "identify": true,
    "page": true,
    "track": true
  },
  "basicOptions": [
    "account",
    "dataset"
  ],
  "advancedOptions": [],
  "options": {
    "account": {
      "default": "",
      "description": "Your Evergage account",
      "label": "Account",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Evergage Account"
        ]
      ]
    },
    "dataset": {
      "default": "",
      "description": "Your Evergage Dataset",
      "label": "Dataset",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Evergage Dataset"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/evergage-default.svg"
  },
  "id": "evergage"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/evergage-default.svg"
}

export default data
