export const id = "new-relic"

export const data = {
  "name": "New Relic",
  "slug": "new-relic",
  "createdAt": "2014-10-06T18:25:27.13Z",
  "note": "",
  "website": "http://newrelic.com",
  "description": "New Relic Insights is a software analytics resource to gather and visualize data about your software and what that data says about your business.",
  "level": 5,
  "categories": [
    "Analytics"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": false,
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "insertKey",
    "accountId"
  ],
  "advancedOptions": [],
  "options": {
    "accountId": {
      "default": "",
      "description": "Your New Relic Insights account ID",
      "label": "Account ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your account ID, it should look like `664853`"
        ]
      ]
    },
    "insertKey": {
      "default": "",
      "description": "Your New Relic Insights insert key",
      "label": "Insert Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your insert key, it looks like `HnduxZ8ZPPgnyfNcPcFzzEBiIVdPXXIZ`"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/new-relic-default.svg"
  },
  "id": "new-relic"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/new-relic-default.svg"
}

export default data
