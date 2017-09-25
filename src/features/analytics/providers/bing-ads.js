export const id = "bing-ads"

export const data = {
  "name": "Bing Ads",
  "slug": "bing-ads",
  "createdAt": "2014-02-06T12:12:50Z",
  "note": "",
  "website": "https://advertise.bingads.microsoft.com/en-us/home",
  "description": "Create campaigns and advertise your product in Bing search.",
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
    "tagId"
  ],
  "advancedOptions": [],
  "options": {
    "tagId": {
      "default": "",
      "description": "Your Bing Universal Event Tracking Tag ID",
      "label": "Tag ID",
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/bing-ads-default.svg"
  },
  "id": "bing-ads"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/bing-ads-default.svg"
}

export default data
