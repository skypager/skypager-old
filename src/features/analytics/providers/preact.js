export const id = "preact"

export const data = {
  "name": "Preact",
  "slug": "preact",
  "createdAt": "2013-08-02T22:53:36Z",
  "note": "",
  "website": "http://preact.com",
  "description": "Preact uses machine learning to understand patterns and make predictions about customer behavior in order to make your entire team better at selling, supporting and renewing accounts.",
  "level": 3,
  "categories": [
    "Customer Success"
  ],
  "popularity": 0.006811547,
  "platforms": {
    "browser": true,
    "mobile": false,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": true,
    "identify": true,
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "projectCode",
    "apiSecret"
  ],
  "advancedOptions": [],
  "options": {
    "apiSecret": {
      "default": "",
      "description": "Your API secret should be at least 10 characters long and look something like this: `f1ment234j`.",
      "label": "API Secret",
      "private": true,
      "type": "string",
      "validators": [
        [
          "regexp",
          "^[a-zA-Z0-9]{9,10}$",
          "Please double check your API Secret. It should be either 9 or 10 characters long and look something like this: `f1ment234j`."
        ]
      ]
    },
    "projectCode": {
      "default": "",
      "description": "Your project code should be at least 10 characters long, and look something like this: `3RnqzjTBwf`.",
      "label": "Project Code",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Project Code."
        ],
        [
          "regexp",
          "^[a-zA-Z0-9]{10,}$",
          "Please double check your Project Code. It should be at least 10 characters long, and look something like this: `3RnqzjTBwf`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/preact-default.svg"
  },
  "id": "preact"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/preact-default.svg"
}

export default data
