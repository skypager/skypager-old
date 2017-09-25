export const id = "clientsuccess"

export const data = {
  "name": "ClientSuccess",
  "slug": "clientsuccess",
  "createdAt": "2015-05-28T23:01:12.274Z",
  "note": "",
  "website": "https://clientsuccess.com/",
  "description": "ClientSuccess develops a customer success management platform to revolutionize the way companies manage, retain, and grow their existing customer base",
  "level": 3,
  "categories": [
    "Customer Success"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": true,
    "group": true,
    "identify": true,
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "apiKey",
    "apiSecret"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can find your API key in ClientSuccess under the top right menu, Apps & Integrations > Usage",
      "label": "API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your API Key."
        ]
      ]
    },
    "apiSecret": {
      "default": "",
      "description": "You can find your Project Id in ClientSuccess under the top right menu, Apps & Integrations > Usage",
      "label": "Project Id",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your ProjectId Key."
        ]
      ]
    },
    "direct": {
      "default": true,
      "private": true,
      "type": "boolean"
    },
    "endpoint": {
      "default": "https://usage.clientsuccess.com/segment/1.0.0/direct",
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "alt": "https://s3.amazonaws.com/segmentio/logos/clientsuccess-alt.png",
    "default": "https://s3.amazonaws.com/segmentio/logos/clientsuccess-default.svg"
  },
  "id": "clientsuccess"
}

export const logos = {
  "alt": "https://s3.amazonaws.com/segmentio/logos/clientsuccess-alt.png",
  "default": "https://s3.amazonaws.com/segmentio/logos/clientsuccess-default.svg"
}

export default data
