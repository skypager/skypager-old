export const id = "insidevault"

export const data = {
  "name": "InsideVault",
  "slug": "insidevault",
  "createdAt": "2014-07-18T18:19:49Z",
  "note": "",
  "website": "http://insidevault.com/",
  "description": "InsideVault is a tool for using Natural Language Processing and data science to improve your Search Engine Marketing advertising.",
  "level": 5,
  "categories": [
    "Advertising"
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
    "clientId",
    "domain",
    "events"
  ],
  "advancedOptions": [
    "noclick"
  ],
  "options": {
    "clientId": {
      "default": "",
      "description": "Your InsideVault account manager will provide your ClientID.",
      "label": "ClientID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Clients ID."
        ]
      ]
    },
    "domain": {
      "default": "",
      "description": "Your InsideVault account manager will provide your Domain, if needed.",
      "label": "Domain",
      "type": "string",
      "validators": []
    },
    "events": {
      "default": {},
      "description": "InsideVault only accepts numbered events like `event1` and `event12`. When you `analytics.track(event, properties)` an event, we need to map that event name to InsideVault numbered event. Enter an event on the left, and the InsideVault event number you want on the right. Email [friends@segment.io](mailto:friends@segment.io) if you need help!",
      "label": "Events",
      "max": 20,
      "prefix": "event",
      "type": "map"
    },
    "noclick": {
      "default": false,
      "description": "Conversions where the pixel-user-id is set to `noclick` will indicate to InsideVault that the conversion should not be matched to a click directly, but instead to a conversion through the conversion's `orderId`. Only use if instructed specifically by your InsideVault account manager.",
      "label": "Use Order Id For Server Side Attribution",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/insidevault-default.svg"
  },
  "id": "insidevault"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/insidevault-default.svg"
}

export default data
