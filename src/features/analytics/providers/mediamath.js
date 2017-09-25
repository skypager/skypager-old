export const id = "mediamath"

export const data = {
  "name": "MediaMath",
  "slug": "mediamath",
  "createdAt": "2014-06-01T23:02:41Z",
  "note": "",
  "website": "http://www.mediamath.com/",
  "description": "MediaMath is a marketing platform that allows you to focus on strategy and performance.",
  "level": 4,
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
    "events"
  ],
  "advancedOptions": [
    "allPagesMtId",
    "allPagesMtAdId"
  ],
  "options": {
    "allPagesMtAdId": {
      "default": "",
      "description": "If you want to fire a conversion pixel on every page of your website (typically to block retargeting) then enter the `mt_adid` for that pixel here, along with the `mt_id` above.",
      "label": "Ad ID for all pages",
      "type": "string"
    },
    "allPagesMtId": {
      "default": "",
      "description": "If you want to fire a conversion pixel on every page of your website (typically to block retargeting) then enter the `mt_id` for that pixel here, along with the `mt_adid` below.",
      "label": "Conversion ID for all pages",
      "type": "string"
    },
    "events": {
      "default": "",
      "description": "Configure a conversion pixel",
      "fields": [
        {
          "default": "",
          "description": "Mediamath allows you to track conversions. When you `analytics.track('my event')` we will map that event to the `mt_id` and `mt_adid` that you provide. We'll map other data like properties to s and v parameters below.",
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
          "description": "Enter the `mt_id` that you want us to send when this conversion event is triggered.",
          "key": "mtId",
          "label": "mt_id",
          "type": "string",
          "validators": []
        },
        {
          "description": "Enter the `mt_adid` that you want us to send when this conversion event is triggered.",
          "key": "mtAdId",
          "label": "mt_adid",
          "type": "string",
          "validators": []
        },
        {
          "default": {},
          "description": "Map event properties to vParameters and we'll insert the value of that property in the corresponding query parameter of the MediaMath Pixel. Email [friends@segment.io](mailto:friends@segment.io) if you need help!",
          "key": "vParameters",
          "label": "V-Parameters",
          "max": 10,
          "prefix": "v",
          "type": "map"
        },
        {
          "default": {},
          "description": "Map event properties to sParameters and we'll insert the value of that property in the corresponding query parameter of the MediaMath Pixel. Email [friends@segment.io](mailto:friends@segment.io) if you need help!",
          "key": "sParameters",
          "label": "S-Parameters",
          "max": 10,
          "prefix": "s",
          "type": "map"
        }
      ],
      "key": "event",
      "label": "Events",
      "type": "mixed"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/mediamath-default.svg"
  },
  "id": "mediamath"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/mediamath-default.svg"
}

export default data
