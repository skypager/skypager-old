export const id = "lytics"

export const data = {
  "name": "Lytics",
  "slug": "lytics",
  "createdAt": "2013-08-02T22:53:36Z",
  "note": "",
  "website": "http://www.getlytics.com/integrations/segmentio",
  "description": "Lytics is a marketing analytics tool that builds consumer profiles for each of your users with data from your site and external sources, so your marketing team gets the full picture.",
  "level": 1,
  "categories": [
    "Analytics"
  ],
  "popularity": 0.0019461564,
  "platforms": {
    "browser": true,
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
    "cid"
  ],
  "advancedOptions": [
    "apiKey"
  ],
  "options": {
    "apiKey": {
      "default": "",
      "description": "Your API key should be a series of numbers and letters, like `3daDLlqb4ANg7l0rf4cfl6xF`.",
      "label": "API Key",
      "type": "string",
      "validators": [
        [
          "regexp",
          "^\\w{10,30}$",
          "Double-check your API Key. It should be a series of numbers and letters, like `3daDLlqb4ANg7l0rf4cfl6xF`."
        ]
      ]
    },
    "cid": {
      "default": "",
      "description": "Your CID should be a series of numbers, like `9289`.",
      "label": "CID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Lytics CID."
        ],
        [
          "regexp",
          "^\\d+$",
          "Double-check your CID. It should be a series of numbers, like `9289`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/lytics-default.svg"
  },
  "id": "lytics"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/lytics-default.svg"
}

export default data
