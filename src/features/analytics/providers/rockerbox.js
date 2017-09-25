export const id = "rockerbox"

export const data = {
  "name": "Rockerbox",
  "slug": "rockerbox",
  "createdAt": "2014-06-01T23:02:41Z",
  "note": "",
  "website": "http://rockerbox.com/",
  "description": "Rockerbox technology learns a user's behavior and advertises to them at the right moment. We add momentum to your conversion funnel.",
  "level": 2,
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
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "source",
    "allAnSeg",
    "customerAnSeg",
    "events"
  ],
  "advancedOptions": [],
  "options": {
    "allAnSeg": {
      "default": "",
      "description": "Pixel called for every customer, on every page.",
      "label": "All Visitor Pixel ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your All Visitor Pixel ID."
        ]
      ]
    },
    "customerAnSeg": {
      "default": "",
      "description": "Pixel called for an existing customer, on every page.",
      "label": "Existing Customer Pixel ID",
      "type": "string"
    },
    "events": {
      "default": "",
      "description": "Rockerbox recognizes pixel ids, not custom events. When you `analytics.track(event, properties)` an event that represents a Rockerbox conversion, you'll need to map the event name on the left to it's corresponding Rockerbox pixel id on the right. Email [friends@segment.io](mailto:friends@segment.io) if you need help!",
      "fields": [
        {
          "default": "",
          "key": "event",
          "label": "Event Name",
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
          "description": "ID used by a pixel called for an event defined in the Events mapping.",
          "key": "conversionId",
          "label": "Conversion ID",
          "type": "string",
          "validators": [
            [
              "required",
              "please enter a conversion id"
            ]
          ]
        },
        {
          "default": "",
          "description": "SEG used by a pixel called for an event defined in the Events mapping.",
          "key": "segmentId",
          "label": "Conversion Segment ID",
          "type": "string",
          "validators": [
            [
              "required",
              "please enter a conversion id"
            ]
          ]
        },
        {
          "default": "email",
          "description": "Property to pass along (typically `email`, `orderId`, `userId`, or sometimes `revenue`).",
          "key": "property",
          "label": "Property",
          "type": "string",
          "validators": []
        }
      ],
      "key": "event",
      "label": "Events",
      "type": "mixed"
    },
    "source": {
      "default": "",
      "description": "The `source` part of your Rockerbox pixels",
      "label": "source",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter the `source` part of your Rockerbox pixels."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/rockerbox-default.svg"
  },
  "id": "rockerbox"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/rockerbox-default.svg"
}

export default data
