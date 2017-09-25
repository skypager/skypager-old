export const id = "threads"

export const data = {
  "name": "Threads",
  "slug": "threads",
  "createdAt": "2015-04-08T23:01:12.274Z",
  "note": "",
  "website": "http://threads.io/",
  "description": "Understand user engagement & easily trigger automated, behavior-driven email with Threads from SendGrid.",
  "level": 1,
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
    "alias": true,
    "group": false,
    "identify": true,
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "apiKey"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "label": "Event Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Event Key."
        ]
      ]
    },
    "direct": {
      "default": true,
      "private": true,
      "type": "boolean"
    },
    "endpoint": {
      "default": "https://input.threads.io/v1/segment/webhook",
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/threads-default.svg"
  },
  "id": "threads"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/threads-default.svg"
}

export default data
