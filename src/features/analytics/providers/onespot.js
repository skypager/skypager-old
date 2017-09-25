export const id = "onespot"

export const data = {
  "name": "OneSpot",
  "slug": "onespot",
  "createdAt": "2015-03-02T01:05:01Z",
  "note": "",
  "website": "https://www.onespot.com/",
  "description": "OneSpot provides Publishing-as-a-Service, a platform that aggregates, filters and prioritizes third party content for publishers",
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
    "pageview": false,
    "track": false
  },
  "basicOptions": [
    "accountId"
  ],
  "advancedOptions": [],
  "options": {
    "accountId": {
      "default": "",
      "description": "Your OneSpot account ID should be the 3-digit code included in your OneSpot script, for e.g. os-123-0",
      "label": "Account Id",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your OneSpot account id"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/onespot-default.svg"
  },
  "id": "onespot"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/onespot-default.svg"
}

export default data
