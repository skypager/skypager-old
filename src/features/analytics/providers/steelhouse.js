export const id = "steelhouse"

export const data = {
  "name": "Steelhouse",
  "slug": "steelhouse",
  "createdAt": "2015-05-18T17:01:12Z",
  "note": "",
  "website": "http://www.steelhouse.com/",
  "description": "SteelHouse is a data-driven marketing technology company that provides advertising solutions for brands, agencies and e-commerce marketers.",
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
    "advertiserId",
    "events"
  ],
  "advancedOptions": [],
  "options": {
    "advertiserId": {
      "default": "",
      "label": "Advertiser Id",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Steelhouse Advertiser Id"
        ]
      ]
    },
    "events": {
      "default": "",
      "description": "These are event names of the track calls that correspond to a conversion in Steelhouse",
      "label": "Conversion events",
      "type": "array"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/steelhouse-default.svg"
  },
  "id": "steelhouse"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/steelhouse-default.svg"
}

export default data
