export const id = "foxmetrics"

export const data = {
  "name": "FoxMetrics",
  "slug": "foxmetrics",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://foxmetrics.com",
  "description": "FoxMetrics is a general purpose analytics tool that lets you track traffic sources, user actions, marketing campaigns, Ecommerce purchases and SaaS subscriptions.",
  "level": 3,
  "categories": [
    "Analytics"
  ],
  "popularity": 0.008757704,
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
    "appId"
  ],
  "advancedOptions": [],
  "options": {
    "appId": {
      "default": "",
      "description": "You can find your App ID (also listed as your API Key) in your FoxMetrics [Applications List](http://dashboard.foxmetrics.com/MyAccount/Applications) under **My Account > Applications**.",
      "label": "App ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your App ID."
        ],
        [
          "regexp",
          "^[a-z0-9]{24}$",
          "Please double check your App ID. It should be 24 characters long, and look something like this: `48d29517240232206ce1e8d3`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/foxmetrics-default.svg"
  },
  "id": "foxmetrics"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/foxmetrics-default.svg"
}

export default data
