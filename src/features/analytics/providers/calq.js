export const id = "calq"

export const data = {
  "name": "Calq",
  "slug": "calq",
  "createdAt": "2014-09-22T23:37:13.249Z",
  "note": "",
  "website": "https://calq.io/",
  "description": "Advanced custom analytics for mobile and web applications",
  "level": 3,
  "categories": [
    "Analytics"
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
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "writeKey"
  ],
  "advancedOptions": [],
  "options": {
    "writeKey": {
      "default": "",
      "description": "You can find your Write Key in the top left corner of the page under Project Settings",
      "label": "Write Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Write Key."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/calq-default.svg"
  },
  "id": "calq"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/calq-default.svg"
}

export default data
