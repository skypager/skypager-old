export const id = "attribution"

export const data = {
  "name": "Attribution",
  "slug": "attribution",
  "createdAt": "2014-09-24T23:02:41Z",
  "note": "",
  "website": "http://attributionapp.com/",
  "description": "Track spending and conversions across marketing channels.",
  "level": 3,
  "categories": [
    "Attribution"
  ],
  "popularity": 0,
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
    "projectId"
  ],
  "advancedOptions": [],
  "options": {
    "projectId": {
      "default": "",
      "description": "Your unique project ID from Attribution, which is accessible from your Attribution account.",
      "label": "Attribution Project Id",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Attribution project Id."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/attribution-default.svg"
  },
  "id": "attribution"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/attribution-default.svg"
}

export default data
