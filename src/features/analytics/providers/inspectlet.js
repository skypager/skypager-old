export const id = "inspectlet"

export const data = {
  "name": "Inspectlet",
  "slug": "inspectlet",
  "createdAt": "2013-09-19T23:19:49Z",
  "note": "",
  "website": "http://inspectlet.com",
  "description": "Inspectlet is a user testing tool that lets you record a few of your visitor's browsing sessions so you can understand how they move around your app and fix the confusing parts!",
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
    "identify": false,
    "pageview": false,
    "track": false
  },
  "basicOptions": [
    "wid"
  ],
  "advancedOptions": [],
  "options": {
    "wid": {
      "default": "",
      "description": "You can find your WID after clicking the **Get Install Code**  button for your site in your [Inspeclet dashboard](https://www.inspectlet.com/dashboard). It will appear near the beginning of your embed code snippet. (It's a big number.). It should be a series of numbers, like `9492461759`.",
      "label": "WID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Project ID."
        ],
        [
          "regexp",
          "^[0-9]+$",
          "Double-check your WID. It should be a series of numbers, like `9492461759`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/inspectlet-default.svg"
  },
  "id": "inspectlet"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/inspectlet-default.svg"
}

export default data
