export const id = "adwords"

export const data = {
  "name": "AdWords",
  "slug": "adwords",
  "createdAt": "2014-01-17T20:52:34Z",
  "note": "",
  "website": "https://adwords.google.com",
  "description": "Advertise on Google and put your message in front of potential customers right when they're searching for what you have to offer.",
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
    "track": true
  },
  "basicOptions": [
    "events",
    "conversionId",
    "remarketing"
  ],
  "advancedOptions": [],
  "options": {
    "conversionId": {
      "default": "",
      "description": "Your AdWords conversion identifier. It looks like `983265867`.",
      "label": "Conversion ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your conversion id, like `983265867`"
        ]
      ]
    },
    "events": {
      "default": {},
      "description": "AdWords recognizes labels, not custom events. When you `analytics.track(event, properties)` an event that represents a AdWords conversion, you'll need to map the event name on the left to it's corresponding AdWords label on the right.",
      "label": "Labels",
      "type": "text-map"
    },
    "remarketing": {
      "default": false,
      "description": "Whether you would like to enable AdWords Remarketing Audience Tracking or not.",
      "label": "Remarketing",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/adwords-default.svg"
  },
  "id": "adwords"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/adwords-default.svg"
}

export default data
