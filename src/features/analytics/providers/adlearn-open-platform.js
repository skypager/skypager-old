export const id = "adlearn-open-platform"

export const data = {
  "name": "AdLearn Open Platform",
  "slug": "adlearn-open-platform",
  "createdAt": "2014-09-09T02:29:35.582Z",
  "note": "",
  "website": "http://www.adlearnop.com/",
  "description": "AdLearn Open Platform is AOL's platform for measuring ad conversions and retargeting pixels",
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
    "identify": true,
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "retargetingPixelId",
    "events"
  ],
  "advancedOptions": [],
  "options": {
    "events": {
      "default": {},
      "description": "AdLearn Open Platform recognizes pixel ids, not custom event names. When you `analytics.track(event, properties)` an event that represents an AdLearn Open Platform conversion, you'll need to map the event name on the left to it's corresponding AdLearn Open Platform pixel id on the right. These pixel ids show up as the `type` parameters in the pixel.",
      "label": "Events",
      "type": "text-map"
    },
    "retargetingPixelId": {
      "default": "",
      "description": "Your Retargeting Pixel ID, for the pixel that loads on every page. It shows up in the pixel as the `betr` parameter.",
      "label": "Retargeting Pixel ID",
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/adlearn-open-platform-default.svg"
  },
  "id": "adlearn-open-platform"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/adlearn-open-platform-default.svg"
}

export default data
