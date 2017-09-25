export const id = "gauges"

export const data = {
  "name": "Gauges",
  "slug": "gauges",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://gaug.es",
  "description": "Gauges is a simple, friendly analytics tool that is perfect for the basic tracking needs of small projects or personal blogs. And all of it's data is queried in real-time.",
  "level": 1,
  "categories": [
    "Analytics",
    "Realtime Dashboards"
  ],
  "popularity": 0.049951345,
  "platforms": {
    "browser": true,
    "mobile": false,
    "server": false
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": false,
    "pageview": true,
    "track": false
  },
  "basicOptions": [
    "siteId"
  ],
  "advancedOptions": [],
  "options": {
    "siteId": {
      "default": "",
      "description": "You can find your Site ID under **Management > Tracking Code** in your [Gauges Dashboard](https://secure.gaug.es/dashboard).  It should be 24 characters long, and look something like this: `93f0e8b9f5a1f530a7000001`.",
      "label": "Site ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Site ID."
        ],
        [
          "regexp",
          "^([a-z0-9]{24})(,[a-z0-9]{24})?$",
          "Please double check your Site ID. It should be 24 characters long, and look something like this: `93f0e8b9f5a1f530a7000001`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/gauges-default.png"
  },
  "id": "gauges"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/gauges-default.png"
}

export default data
