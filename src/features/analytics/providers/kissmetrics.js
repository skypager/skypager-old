export const id = "kissmetrics"

export const data = {
  "name": "KISSmetrics",
  "slug": "kissmetrics",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://kissmetrics.com",
  "description": "KISSmetrics is a customer-focused event tracking tool with simple metrics and reports for each section of your business: individual customers, customer actions and revenue.",
  "level": 1,
  "categories": [
    "Analytics"
  ],
  "popularity": 0.14985403,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": true,
    "group": false,
    "identify": true,
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "apiKey",
    "trackNamedPages",
    "trackCategorizedPages",
    "prefixProperties"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can find your API Key on the KISSmetrics [Settings page](https://www.kissmetrics.com/settings).",
      "label": "API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your KISSmetrics API Key."
        ],
        [
          "regexp",
          "^[a-z0-9]{40}$",
          "Please double check your API Key. It should be 40 characters long, and look something like this: `2b93bdf937c54fc7da2b5c6015c273bf3919c273`."
        ]
      ]
    },
    "prefixProperties": {
      "default": true,
      "description": "Prefix the properties with the page or event name.",
      "label": "Prefix Properties",
      "type": "boolean"
    },
    "trackCategorizedPages": {
      "default": true,
      "description": "Send an event for every page with a category.",
      "label": "Track Categorized Pages",
      "type": "boolean"
    },
    "trackNamedPages": {
      "default": true,
      "description": "Send an event for every page with a name.",
      "label": "Track Named Pages",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/kissmetrics-default.svg"
  },
  "id": "kissmetrics"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/kissmetrics-default.svg"
}

export default data
