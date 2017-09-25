export const id = "lucky-orange"

export const data = {
  "name": "Lucky Orange",
  "slug": "lucky-orange",
  "createdAt": "2013-11-13T03:54:21Z",
  "note": "",
  "website": "http://luckyorange.com",
  "description": "Lucky Orange is a user testing tool for your website with heatmaps, screen recordings, live chat and polls that help you learn about how people use your website.",
  "level": 1,
  "categories": [
    "Heatmaps and Recordings",
    "Livechat",
    "Surveys"
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
    "track": false
  },
  "basicOptions": [
    "siteId"
  ],
  "advancedOptions": [],
  "options": {
    "siteId": {
      "default": "",
      "description": "Your Site ID.",
      "label": "Site ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Lucky Orange Site ID."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/lucky-orange-default.png"
  },
  "id": "lucky-orange"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/lucky-orange-default.png"
}

export default data
