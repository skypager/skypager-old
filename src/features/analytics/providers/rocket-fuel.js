export const id = "rocket-fuel"

export const data = {
  "name": "Rocket Fuel",
  "slug": "rocket-fuel",
  "createdAt": "2014-09-08T06:02:02.399Z",
  "note": "",
  "website": "http://rocketfuel.com/",
  "description": "Rocket Fuel is an ad-buying platform that uses artificial intelligence.",
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
    "accountId",
    "universalActionId",
    "events"
  ],
  "advancedOptions": [],
  "options": {
    "accountId": {
      "default": "",
      "description": "Your Account ID, provided by your Rocket Fuel account manager. It shows up in the pixel as the `rb` parameter.",
      "label": "Account ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Account ID"
        ]
      ]
    },
    "events": {
      "default": {},
      "description": "Rocket Fuel recognizes pixel ids, not custom event names. When you `analytics.track(event, properties)` an event that represents a Rocket Fuel conversion, you'll need to map the event name on the left to it's corresponding Rocket Fuel pixel id on the right. These pixel ids show up as the `ca` parameters in the pixel.",
      "label": "Events",
      "type": "text-map"
    },
    "universalActionId": {
      "default": "",
      "description": "Your Universal Pixel ID, for the pixel that loads on every page. It shows up in the pixel as the `ca` parameter.",
      "label": "Universal Pixel ID",
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/rocket-fuel-default.svg"
  },
  "id": "rocket-fuel"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/rocket-fuel-default.svg"
}

export default data
