export const id = "satismeter"

export const data = {
  "name": "SatisMeter",
  "slug": "satismeter",
  "createdAt": "2015-01-21T01:05:01Z",
  "note": "",
  "website": "https://satismeter.com/en/",
  "description": "SatisMeter helps you gather customer feedback using the Net Promoter® System",
  "level": 1,
  "categories": [
    "Surveys"
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
    "track": false
  },
  "basicOptions": [
    "token"
  ],
  "advancedOptions": [],
  "options": {
    "token": {
      "default": "",
      "description": "To find your token first create a project in your Satismeter dashboard, and then navigate to Admin > Install. The token should look like ad1gopRrdl",
      "label": "Token",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Satismeter token"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "alt": "https://s3.amazonaws.com/segmentio/logos/satismeter-alt.png",
    "default": "https://s3.amazonaws.com/segmentio/logos/satismeter-default.svg"
  },
  "id": "satismeter"
}

export const logos = {
  "alt": "https://s3.amazonaws.com/segmentio/logos/satismeter-alt.png",
  "default": "https://s3.amazonaws.com/segmentio/logos/satismeter-default.svg"
}

export default data
