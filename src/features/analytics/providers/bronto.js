export const id = "bronto"

export const data = {
  "name": "Bronto",
  "slug": "bronto",
  "createdAt": "2014-01-22T14:39:01Z",
  "note": "",
  "website": "http://www.bronto.com/",
  "description": "Bronto is an advanced marketing automation platform for commerce.",
  "level": 4,
  "categories": [
    "Email"
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
    "track": true
  },
  "basicOptions": [
    "siteId"
  ],
  "advancedOptions": [
    "host"
  ],
  "options": {
    "host": {
      "default": "",
      "description": "You can use your own domain with Bronto",
      "label": "Domain",
      "type": "string",
      "validators": [
        [
          "domain",
          "Please enter a valid domain name, like `company.com`."
        ]
      ]
    },
    "siteId": {
      "default": "",
      "description": "You can find your Site ID in your Bronto [Account Page](https://app.bronto.com/login/index/login/)",
      "label": "Site ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Site ID"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/bronto-default.svg"
  },
  "id": "bronto"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/bronto-default.svg"
}

export default data
