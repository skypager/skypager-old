export const id = "hittail"

export const data = {
  "name": "HitTail",
  "slug": "hittail",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://mbsy.co/brnV",
  "description": "HitTail is a search analytics tool that helps you find new ways to increase the search traffic to your site by automatically finding you good keywords to write content about.",
  "level": 2,
  "categories": [
    "Analytics"
  ],
  "popularity": 0.018164126,
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
      "description": "You can find your Site ID on Sites tab (click **view** for details) of your [HitTail account](http://mbsy.co/brnV). It should be a series of numbers, like `99213`.",
      "label": "Site ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Site ID."
        ],
        [
          "regexp",
          "^\\d+$",
          "Double-check your Site ID. It should be a series of numbers, like `99213`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/hittail-default.svg"
  },
  "id": "hittail"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/hittail-default.svg"
}

export default data
