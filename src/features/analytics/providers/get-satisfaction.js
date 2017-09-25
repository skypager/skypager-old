export const id = "get-satisfaction"

export const data = {
  "name": "Get Satisfaction",
  "slug": "get-satisfaction",
  "createdAt": "2013-11-12T20:26:28Z",
  "note": "",
  "website": "http://getsatisfaction.com",
  "description": "Get Satisfaction is a tool that helps you build a community around your product by letting your users ask for support and give product feedback directly from your website.",
  "level": 2,
  "categories": [
    "Helpdesks",
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
    "widgetId"
  ],
  "advancedOptions": [
    "widgetId"
  ],
  "options": {
    "widgetId": {
      "default": "",
      "description": "Your Widget ID",
      "label": "Widget ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Get Satisfaction Widget ID."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/get-satisfaction-default.svg"
  },
  "id": "get-satisfaction"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/get-satisfaction-default.svg"
}

export default data
