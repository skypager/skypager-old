export const id = "kahuna"

export const data = {
  "name": "Kahuna",
  "slug": "kahuna",
  "createdAt": "2014-11-12T18:00:01Z",
  "note": "",
  "website": "http://go.kahuna.com/segment",
  "description": "Kahuna is a mobile marketing automation tool that drives engagement through push notifications, in-app messages, email, and social ads.",
  "level": 3,
  "categories": [
    "Push Notifications",
    "Email"
  ],
  "popularity": 0,
  "platforms": {
    "browser": false,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": true,
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "apiKey",
    "pushSenderId",
    "env"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "The Secret Key can be found in Settings > App settings",
      "label": "Secret Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your App Key"
        ]
      ]
    },
    "env": {
      "default": false,
      "description": "Check to send data to production account (default sandbox)",
      "label": "Send data to production environment (default sandbox)",
      "type": "boolean"
    },
    "pushSenderId": {
      "default": "",
      "description": "The sender id is also called the project number in your Google API project. Make sure you have created a project by following instructions [here](http://app.usekahuna.com/tap/getstarted/android/), under 'Enable Personalized Push'",
      "label": "Sender ID / Google API Project Number",
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/kahuna-default.svg"
  },
  "id": "kahuna"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/kahuna-default.svg"
}

export default data
