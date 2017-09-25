export const id = "tv-squared"

export const data = {
  "name": "TV Squared",
  "slug": "tv-squared",
  "createdAt": "2014-10-17T18:36:55Z",
  "note": "",
  "website": "http://www.tvsquared.com/",
  "description": "Helps TV advertisers and media buyers to attribute, measure and optimise TV performance for a better ROI",
  "level": 3,
  "categories": [
    "Advertising"
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
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "brandId",
    "hostname"
  ],
  "advancedOptions": [],
  "options": {
    "brandId": {
      "default": "",
      "description": "Enter your TV Squared brand id",
      "label": "Brand Id",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your brand id"
        ]
      ]
    },
    "hostname": {
      "default": "",
      "description": "Enter your TV Squared hostname",
      "label": "Hostname",
      "type": "string",
      "validators": [
        [
          "regexp",
          "^[.a-zA-Z0-9_-]+\\.[.a-zA-Z0-9_-]+$",
          "Please enter a valid hostname like `collector-123.tvsquared.com`"
        ],
        [
          "required",
          "Please enter your hostname"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/tvsquared-default.svg"
  },
  "id": "tv-squared"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/tvsquared-default.svg"
}

export default data
