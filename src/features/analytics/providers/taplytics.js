export const id = "taplytics"

export const data = {
  "name": "Taplytics",
  "slug": "taplytics",
  "createdAt": "2014-06-01T23:02:41Z",
  "note": "",
  "website": "http://taplytics.com",
  "description": "Taplytics is an A/B testing tool for iOS. Taplytics enables you to create A/B tests visually, or in code, without waiting for App Store updates.",
  "level": 3,
  "categories": [
    "A/B Testing"
  ],
  "popularity": 0,
  "platforms": {
    "browser": false,
    "mobile": true,
    "server": false
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": false,
    "pageview": false,
    "track": false
  },
  "basicOptions": [
    "apiKey"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can find your API Key under **Project Settings** in the upper-left of the [Taplytics interface](https://taplytics.com).",
      "label": "API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Taplytics API Key."
        ],
        [
          "regexp",
          "^[a-f0-9]{40}$",
          "Please double check your API Key; it looks like it's misspelled. It should be a 40 character hexadecimal number."
        ]
      ]
    },
    "delayLoad": {
      "default": false,
      "description": "Seconds to keep showing the splash screen until the experiments are loaded. Used for when running an experiment on the first page of the app.",
      "label": "Delay Load (iOS)",
      "type": "number"
    },
    "pushSandbox": {
      "default": false,
      "description": "Configures whether the push token for the device is a production token or if it is a development token.",
      "label": "Push Sandbox (iOS)",
      "type": "boolean"
    },
    "shakeMenu": {
      "default": false,
      "description": "This will control whether the in-app Shake Menu is enabled or not.",
      "label": "Enable Shake Menu (iOS)",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/taplytics-default.svg"
  },
  "id": "taplytics"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/taplytics-default.svg"
}

export default data
