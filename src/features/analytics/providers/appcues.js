export const id = "appcues"

export const data = {
  "name": "Appcues",
  "slug": "appcues",
  "createdAt": "2015-05-05T17:01:12Z",
  "note": "",
  "website": "http://www.appcues.com/",
  "description": "Create personalized user onboarding flows without changing any code that will improve your product's adoption and retention rates.",
  "level": 3,
  "categories": [
    "Personalization"
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
    "identify": true,
    "pageview": false,
    "track": false
  },
  "basicOptions": [
    "appcuesId"
  ],
  "advancedOptions": [],
  "options": {
    "appcuesId": {
      "default": "",
      "label": "Appcues Id",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Appcues Id"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/appcues-default.svg"
  },
  "id": "appcues"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/appcues-default.svg"
}

export default data
