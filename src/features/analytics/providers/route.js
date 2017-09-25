export const id = "route"

export const data = {
  "name": "Route",
  "slug": "route",
  "createdAt": "2015-06-02T17:31:56.083Z",
  "note": "",
  "website": "http://route.to",
  "description": "Route allows you to convert your leads into customers and your customers into great customers",
  "level": 3,
  "categories": [
    "Email"
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
    "organizationId"
  ],
  "advancedOptions": [],
  "options": {
    "organizationId": {
      "default": "",
      "description": "You can find your Route organization id under Setup. It should look like `553e9be8ab3e3a16d07b1232`",
      "label": "Organization Id",
      "private": false,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Route organization id"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "alt": "https://s3.amazonaws.com/segmentio/logos/route-alt.png",
    "default": "https://s3.amazonaws.com/segmentio/logos/route-default.svg"
  },
  "id": "route"
}

export const logos = {
  "alt": "https://s3.amazonaws.com/segmentio/logos/route-alt.png",
  "default": "https://s3.amazonaws.com/segmentio/logos/route-default.svg"
}

export default data
