export const id = "shareasale"

export const data = {
  "name": "ShareASale",
  "slug": "shareasale",
  "createdAt": "2014-07-25T00:00:00Z",
  "note": "",
  "website": "http://shareasale.com",
  "description": "ShareASale is an affiliate advertising network for e-commerce sites.",
  "level": 3,
  "categories": [
    "Advertising"
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
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "merchantId"
  ],
  "advancedOptions": [
    "createLeads"
  ],
  "options": {
    "createLeads": {
      "default": false,
      "description": "This will create leads in ShareaSale for [`identify` method](https://segment.io/libraries/analytics.js#identify) calls that have a `userID` associated with them.",
      "label": "Create Leads",
      "type": "boolean"
    },
    "merchantId": {
      "default": "",
      "description": "The `merchantId` given to you by your ShareASale account manager.",
      "label": "Merchant ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your ShareASale merchantId."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/shareasale-default.svg"
  },
  "id": "shareasale"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/shareasale-default.svg"
}

export default data
