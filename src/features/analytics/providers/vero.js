export const id = "vero"

export const data = {
  "name": "Vero",
  "slug": "vero",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://getvero.com",
  "description": "Vero is an email marketing tool that lets you set up automated emails to your users that get sent after they've completed certain actions.",
  "level": 3,
  "categories": [
    "Email"
  ],
  "popularity": 0.023678236,
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
    "authToken"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can find your API Key on the [Getting Started page](http://www.getvero.com/getting-started).",
      "label": "API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Vero API Key."
        ],
        [
          "regexp",
          "^[a-f0-9]{40}$",
          "Please double check your API Key. It should be 40 characters long, and look something like this: `a3927d01bc9326a8aaa1cd31b923761556f50ca6`."
        ]
      ]
    },
    "authToken": {
      "default": "",
      "description": "Your auth token allows you to send data to Vero through our server-side libraries. You can find your `auth_token` on <a href=\"http://www.getvero.com/account\">Vero's account page</a>.",
      "label": "Auth Token",
      "private": true,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Vero Auth Token."
        ],
        [
          "regexp",
          "^[a-zA-Z0-9]{108}$",
          "Please double check your API Key. It should be 108 characters long and comprised of numbers and letters."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/vero-default.svg"
  },
  "id": "vero"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/vero-default.svg"
}

export default data
