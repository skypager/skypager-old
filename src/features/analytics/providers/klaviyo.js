export const id = "klaviyo"

export const data = {
  "name": "Klaviyo",
  "slug": "klaviyo",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://klaviyo.com",
  "description": "Klaviyo is an automated email tool that lets you automatically send emails to your users after they perform a specific action in your application.",
  "level": 3,
  "categories": [
    "Email"
  ],
  "popularity": 0.007460266,
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
    "apiKey"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "Your API key",
      "label": "API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Klaviyo API Key."
        ],
        [
          "regexp",
          "^[a-zA-Z0-9]{6}$",
          "Please double check your API Key. It should look something like this: `y8AapT`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/klaviyo-default.svg"
  },
  "id": "klaviyo"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/klaviyo-default.svg"
}

export default data
