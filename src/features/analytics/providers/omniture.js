export const id = "omniture"

export const data = {
  "name": "Omniture",
  "slug": "omniture",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://www.adobe.com/solutions/digital-marketing.html",
  "description": "Omniture, also known as Adobe SiteCatalyst or Adobe Marketing Cloud, is a marketing analytics tool for big business that offers a wide range of features like A/B testing and segmentation.",
  "level": 5,
  "categories": [
    "Analytics"
  ],
  "popularity": 0.0048653907,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": false,
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "reportSuiteId",
    "includeTimestamp",
    "trackingServerUrl",
    "events",
    "props",
    "eVars",
    "hVars"
  ],
  "advancedOptions": [
    "initialPage",
    "trackingServerSecureUrl"
  ],
  "options": {
    "eVars": {
      "default": {},
      "description": "Omniture only accepts eVars like `eVar7` and `eVar23`. When you `analytics.track(event, properties)` an event with custom `properties`, we need to map those properties to Omniture eVars. Enter a property name on the left, and the Omniture eVar number you want on the right. Email [friends@segment.io](mailto:friends@segment.io) if you need help!",
      "label": "eVars",
      "max": 75,
      "prefix": "eVar",
      "type": "map"
    },
    "events": {
      "default": {},
      "description": "Omniture only accepts events like `event1` and `event67`. When you `analytics.track(event, properties)` an event with a custom name, we need to map those custom names to Omniture event numbers. Enter a custom event name on the left, and the Omniture event number you want on the right. Email [friends@segment.io](mailto:friends@segment.io) if you need help!",
      "label": "Events",
      "max": 1000,
      "prefix": "event",
      "type": "map"
    },
    "hVars": {
      "default": {},
      "description": "Omniture only accepts hVars like `hier1` and `hier2`. When you `analytics.page(name, properties)` an event with custom `properties`, we need to map those properties to Omniture hVars. Enter a property name on the left, and the Omniture hVar number you want on the right. Email [friends@segment.io](mailto:friends@segment.io) if you need help!",
      "label": "Hierarchy Variables",
      "max": 5,
      "prefix": "hier",
      "type": "map"
    },
    "includeTimestamp": {
      "default": true,
      "description": "Omniture Report Suites will not accept both timestamped and non-timestamped data. If your report suite is timestamp-enabled, check this box. Otherwise, uncheck it. We can only replay historical data into timestamp-enabled report suites.",
      "label": "Yes, this Report Suite is timestamp-enabled. Include the timestamp with each event and pageview.",
      "type": "boolean"
    },
    "initialPage": {
      "default": true,
      "description": "Disable this if you'd like to manually continue tracking your own pages using `s.t()`.",
      "label": "Yes, I want Segment to track an automatic pageview for omniture rather than handling it myself",
      "type": "boolean"
    },
    "props": {
      "default": {},
      "description": "Omniture only accepts props like `prop13` and `prop32`. When you `analytics.track(event, properties)` an event with custom `properties`, we need to map those properties to Omniture props. Enter a property name on the left, and the Omniture prop number you want on the right. Email [friends@segment.io](mailto:friends@segment.io) if you need help!",
      "label": "Props",
      "max": 75,
      "prefix": "prop",
      "type": "map"
    },
    "reportSuiteId": {
      "default": "",
      "description": "You can find your Report Suite ID in your [Omniture Settings page](http://omniture.com/). Multiple report suite ids can be separated by commas: `suite1,suite2,suite3`.",
      "label": "Report Suite ID(s)",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Omniture Report Suite ID(s)."
        ]
      ]
    },
    "trackingServerSecureUrl": {
      "default": "",
      "description": "This is the secure URL of your Omniture server.",
      "label": "Tracking Server Secure URL",
      "type": "string",
      "validators": []
    },
    "trackingServerUrl": {
      "default": "",
      "description": "This is the URL of your Omniture server.",
      "label": "Tracking Server URL",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Omniture Tracking Server URL."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/omniture-default.svg"
  },
  "id": "omniture"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/omniture-default.svg"
}

export default data
