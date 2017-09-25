export const id = "chameleon"

export const data = {
  "name": "Chameleon",
  "slug": "chameleon",
  "createdAt": "2015-05-18T17:01:12Z",
  "note": "",
  "website": "http://www.trychameleon.com/",
  "description": "Chameleon lets you create great user onboarding without coding",
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
    "alias": true,
    "group": true,
    "identify": true,
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "accountId"
  ],
  "advancedOptions": [],
  "options": {
    "accountId": {
      "default": "",
      "label": "Account Id",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Account Id"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/chameleon-default.svg"
  },
  "id": "chameleon"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/chameleon-default.svg"
}

export default data
