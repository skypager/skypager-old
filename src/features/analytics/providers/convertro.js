export const id = "convertro"

export const data = {
  "name": "Convertro",
  "slug": "convertro",
  "createdAt": "2014-02-12T18:16:07Z",
  "note": "",
  "website": "http://www.convertro.com/",
  "description": "Convertro helps marketers understand where to allocate budget across channels at the most granular level, to maximize ad performance and accelerate growth",
  "level": 5,
  "categories": [
    "Attribution"
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
    "track": true
  },
  "basicOptions": [
    "account",
    "events"
  ],
  "advancedOptions": [
    "hybridAttributionModel"
  ],
  "options": {
    "account": {
      "default": "",
      "description": "Enter your Convertro Account Name",
      "label": "Account",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Convertro Account Name."
        ]
      ]
    },
    "events": {
      "default": {},
      "description": "Convertro only wants to receive specific events. For each conversion event you want to send to Convertro, put the event name you send to Segment on the left, and the name you want Convertro to receive it as on the right.",
      "label": "Events",
      "type": "text-map"
    },
    "hybridAttributionModel": {
      "default": false,
      "description": "This will make **Completed Order** events always send a `sale` event in addition to a `sale.new` or `sale.repeat` event if it has a boolean `repeat` property.",
      "label": "Hybrid Attribution Model",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/convertro-default.svg"
  },
  "id": "convertro"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/convertro-default.svg"
}

export default data
