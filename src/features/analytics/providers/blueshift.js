export const id = "blueshift"

export const data = {
  "name": "Blueshift",
  "slug": "blueshift",
  "createdAt": "2014-11-24T22:36:58Z",
  "note": "",
  "website": "http://getblueshift.com/",
  "description": "Blueshift's predictive marketing automates behavioral messaging on email, push notifications, display, Facebook and more",
  "level": 3,
  "categories": [
    "Email",
    "Push Notifications",
    "Advertising"
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
    "retarget"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "Your API key can be found in Account Profile > API Keys",
      "label": "API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Blueshift API Key."
        ]
      ]
    },
    "retarget": {
      "default": false,
      "description": "This will retarget page calls on the client-side",
      "label": "Retarget",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/Blueshift-default.svg"
  },
  "id": "blueshift"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/Blueshift-default.svg"
}

export default data
