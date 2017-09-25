export const id = "spinnakr"

export const data = {
  "name": "Spinnakr",
  "slug": "spinnakr",
  "createdAt": "2013-09-19T23:19:49Z",
  "note": "",
  "website": "http://spinnakr.com",
  "description": "Spinnakr is a tool that monitors your users and lets you send them targetted messages depending on their behavior. So you can offer deals or send out welcome messages or alerts.",
  "level": 1,
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
    "identify": false,
    "pageview": false,
    "track": false
  },
  "basicOptions": [
    "siteId"
  ],
  "advancedOptions": [],
  "options": {
    "siteId": {
      "default": "",
      "description": "Your Spinnakr Site ID. It should be a series of numbers like: `968925604`.",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Spinnakr Site ID."
        ],
        [
          "regexp",
          "^[0-9]+$",
          "Please double check your Site ID. It should be a series of numbers like: `968925604`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/spinnakr-default.svg"
  },
  "id": "spinnakr"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/spinnakr-default.svg"
}

export default data
