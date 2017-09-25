export const id = "librato"

export const data = {
  "name": "Librato",
  "slug": "librato",
  "createdAt": "2013-03-29T01:05:01Z",
  "note": "",
  "website": "http://librato.com",
  "description": "Librato is a metrics and monitoring dashboard for any metric of your business, including user actions. You can create custom dashboards for each of your different teams.",
  "level": 3,
  "categories": [
    "Analytics",
    "Realtime Dashboards"
  ],
  "popularity": 0.009730781,
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
    "email",
    "token"
  ],
  "advancedOptions": [],
  "options": {
    "email": {
      "default": "",
      "description": "This should be the email you signed up for your Librato account with.",
      "label": "email",
      "private": true,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Librato account email."
        ],
        [
          "email",
          "Please double check your email address."
        ]
      ]
    },
    "token": {
      "default": "",
      "description": "You can find your API Token on the Librato [Account page](https://metrics.librato.com/account).",
      "label": "Token",
      "private": true,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Librato API Token."
        ],
        [
          "regexp",
          "^[a-z0-9]{22,65}$",
          "Please double check your API Token. It should be 64 characters long and composed of numbers and letters only."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/librato-default.svg"
  },
  "id": "librato"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/librato-default.svg"
}

export default data
