export const id = "sendwithus"

export const data = {
  "name": "Sendwithus",
  "slug": "sendwithus",
  "createdAt": "2015-01-20T23:48:41Z",
  "note": "",
  "website": "https://sendwithus.com/",
  "description": "The easiest way to send email from your application. A simple API and Dashboard to manage and optimize emails sent by your application to your customers",
  "level": 3,
  "categories": [
    "Email"
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
    "identify": true,
    "page": false,
    "track": true
  },
  "basicOptions": [
    "apiKey",
    "integrationId"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can find your Sendwithus API key under Technical Stuff > API Settings",
      "label": "API Key",
      "private": true,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Sendwithus API Key."
        ]
      ]
    },
    "integrationId": {
      "default": "",
      "description": "To find your integration ID, create a Segment.com integration under Automation > Triggers. The ID should look like sio_MC2T2LaHDvsNDjDke7aC6Q.",
      "label": "Integration ID",
      "private": true,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your integration ID."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/sendwithus-default.svg"
  },
  "id": "sendwithus"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/sendwithus-default.svg"
}

export default data
