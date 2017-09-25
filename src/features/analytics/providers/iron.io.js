export const id = "iron.io"

export const data = {
  "name": "Iron.io",
  "slug": "iron.io",
  "createdAt": "2014-06-01T23:02:41Z",
  "note": "",
  "website": "http://iron.io",
  "description": "Iron.io provides a queueing service for building distributed applications. Our integration will send your analytics data directly to their queues so you can programmatically interact with them.",
  "level": 1,
  "categories": [
    "Raw Data",
    "Error and Performance Monitoring"
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
    "projectId",
    "token",
    "apiVersion",
    "endpoint"
  ],
  "advancedOptions": [],
  "options": {
    "apiVersion": {
      "default": "1",
      "description": "Your desired Iron.io API version.",
      "label": "API Version",
      "options": [
        {
          "text": "1",
          "value": "1"
        },
        {
          "text": "3",
          "value": "3"
        }
      ],
      "type": "select"
    },
    "endpoint": {
      "default": "https://mq-aws-us-east-1.iron.io",
      "description": "Your Iron.io API endpoint.",
      "label": "Endpoint",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Iron.io API endpoint."
        ]
      ]
    },
    "projectId": {
      "default": "",
      "description": "You can find your **Project ID** under the IronMQ settings for your project.",
      "label": "Project ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Iron.io Project ID."
        ],
        [
          "regexp",
          "^[\\dabcdefABCDEF]{24}$",
          "Please check your Project ID. It should be a 24 digit hex number that looks like this: `234bf145c29690009000039`"
        ]
      ]
    },
    "token": {
      "default": "",
      "description": "You can find your token under the IronMQ settings for your project.",
      "label": "Token",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Iron.io token."
        ],
        [
          "regexp",
          "^[\\da-zA-Z-_]+$",
          "Please check your token. It should be a string that looks like this: `mek4ZE1efmC5aHg11kC2HAPJw2o`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/iron-io-default.svg"
  },
  "id": "iron.io"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/iron-io-default.svg"
}

export default data
