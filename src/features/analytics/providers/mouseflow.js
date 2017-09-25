export const id = "mouseflow"

export const data = {
  "name": "Mouseflow",
  "slug": "mouseflow",
  "createdAt": "2014-01-20T23:22:12Z",
  "note": "",
  "website": "http://mouseflow.com/",
  "description": "Mouseflow lets you record website visitors and generate instant heatmaps where they click, scroll and even pay attention.",
  "level": 2,
  "categories": [
    "Heatmaps and Recordings"
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
    "apiKey"
  ],
  "advancedOptions": [
    "mouseflowHtmlDelay"
  ],
  "options": {
    "apiKey": {
      "default": "",
      "description": "Your Mouseflow site ID.",
      "label": "Site ID",
      "type": "string"
    },
    "mouseflowHtmlDelay": {
      "default": 0,
      "description": "HTML Delay",
      "label": "Mouseflow HTML Delay",
      "type": "number"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/mouseflow-default.svg"
  },
  "id": "mouseflow"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/mouseflow-default.svg"
}

export default data
