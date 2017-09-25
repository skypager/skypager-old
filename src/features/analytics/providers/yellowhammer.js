export const id = "yellowhammer"

export const data = {
  "name": "Yellowhammer",
  "slug": "yellowhammer",
  "createdAt": "2015-02-13T12:02:41Z",
  "note": "",
  "website": "http://yhmg.com/",
  "description": "Yellowhammer is a digital agency with a focus on performance marketing display campaigns & technologies",
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
    "segmentId",
    "events"
  ],
  "advancedOptions": [],
  "options": {
    "events": {
      "default": "",
      "description": "Yellowhammer will send both an omnitarget pixel as well as an adnexus pixel on specified conversion events. Email [friends@segment.io](mailto:friends@segment.io) if you need help!",
      "fields": [
        {
          "default": "",
          "key": "event",
          "label": "Conversion Event Name",
          "type": "string",
          "validators": [
            [
              "required",
              "please enter a custom event name"
            ]
          ]
        },
        {
          "default": "",
          "description": "ID used by Omnitarget pixel called for an event defined in the Events mapping.",
          "key": "omnitargetId",
          "label": "Omnitarget ID",
          "type": "string",
          "validators": [
            [
              "required",
              "Please enter an Omnitarget ID, it should look like 'tr123456'"
            ]
          ]
        },
        {
          "default": "",
          "description": "Pixel ID used by Appnexus for an event defined in the Events mapping",
          "key": "pixelId",
          "label": "Appnexus pixel ID",
          "type": "string",
          "validators": [
            [
              "required",
              "Please enter a conversion pixel id"
            ]
          ]
        }
      ],
      "key": "event",
      "label": "Events",
      "type": "mixed"
    },
    "segmentId": {
      "default": "",
      "description": "Exclusion pixel called by for every customer, on every page.",
      "label": "Exclusion Pixel ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Exclusion Pixel ID."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/yellowhammer-default.svg"
  },
  "id": "yellowhammer"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/yellowhammer-default.svg"
}

export default data
