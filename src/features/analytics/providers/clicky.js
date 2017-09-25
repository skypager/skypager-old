export const id = "clicky"

export const data = {
  "name": "Clicky",
  "slug": "clicky",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://clicky.com/100566366",
  "description": "Clicky is a general-purpose, free analytics tool that gives you access to lots of the same features as Google Analytics. It also comes with a real-time dashboard.",
  "level": 1,
  "categories": [
    "Analytics",
    "Realtime Dashboards"
  ],
  "popularity": 0.0775219,
  "platforms": {
    "browser": true,
    "mobile": false,
    "server": false
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": true,
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "siteId"
  ],
  "advancedOptions": [],
  "options": {
    "siteId": {
      "default": "",
      "description": "You can find your Site ID under the **Preferences** tab on your [Clicky account](http://clicky.com/100566366).",
      "label": "Site ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Clicky Site ID."
        ],
        [
          "regexp",
          "^\\d+$",
          "Please double check your Site ID. It should be a series of numbers, like this: `900631468`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/clicky-default.svg"
  },
  "id": "clicky"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/clicky-default.svg"
}

export default data
