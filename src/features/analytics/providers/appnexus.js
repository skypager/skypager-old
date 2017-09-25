export const id = "appnexus"

export const data = {
  "name": "AppNexus",
  "slug": "appnexus",
  "createdAt": "2014-06-01T23:02:41Z",
  "note": "",
  "website": "http://www.appnexus.com/",
  "description": "",
  "level": 5,
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
  "advancedOptions": [],
  "options": {
    "events": {
      "default": "",
      "description": "Configure a pixel",
      "fields": [
        {
          "default": "",
          "description": "AppNexus allows you to track both conversions and segments, when you `analytics.track('my event')` we will map that custom event to `segment-id` or `pixel-id` that you provided, when `conversion` is ticked we will track a `conversion` otherwise we will track a `segment` otherwise we will track a conversion.",
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
          "description": "Enter a Pixel ID that you want us to map to the custom event",
          "key": "pixelId",
          "label": "Pixel ID",
          "type": "string",
          "validators": []
        },
        {
          "description": "Enter a Segment ID that you want us to map to the custom event",
          "key": "segmentId",
          "label": "Segment ID",
          "type": "string",
          "validators": []
        },
        {
          "default": {},
          "description": "Enter any event properties you want to map to query parameters in the AppNexus url. Two parameters are sent automatically: `order_id` and the monetary `value`.",
          "key": "parameters",
          "label": "Query Parameters",
          "type": "text-map"
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
    "default": "https://s3.amazonaws.com/segmentio/logos/appnexus-default.svg"
  },
  "id": "appnexus"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/appnexus-default.svg"
}

export default data
