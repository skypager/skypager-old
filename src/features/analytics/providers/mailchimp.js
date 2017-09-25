export const id = "mailchimp"

export const data = {
  "name": "MailChimp",
  "slug": "mailchimp",
  "createdAt": "2014-02-06T03:12:06Z",
  "note": "",
  "website": "http://mailchimp.com/",
  "description": "MailChimp lets you design and send email marketing campaigns.",
  "level": 3,
  "categories": [
    "Email"
  ],
  "popularity": 0.017515408,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": true,
    "pageview": false,
    "track": false
  },
  "basicOptions": [
    "datacenter",
    "listId",
    "apiKey",
    "doubleOptIn"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You create and copy-paste your MailChimp API Key from Account Settings > Extras > API Keys.",
      "label": "API Key",
      "private": true,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your API Key."
        ],
        [
          "regexp",
          "^[a-z0-9]+-[a-z0-9]+$",
          "Please double check your API Key. It should look something like this: `8014dc04a09e2c738504a3b3fbc71108-us1`."
        ]
      ]
    },
    "datacenter": {
      "default": "",
      "description": "You can find your Datacenter ID in the MailChimp url in your browser when you're logged in. It's the 'us1' in 'https://us1.admin.mailchimp.com/lists/'.",
      "label": "Datacenter ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Datacenter ID."
        ],
        [
          "regexp",
          "^[a-z0-9]+$",
          "Double-check your Datacenter ID. It should be a series of numbers and letters, like `us1`."
        ]
      ]
    },
    "doubleOptIn": {
      "default": false,
      "description": "An optional flag to control whether a double opt-in confirmation message is sent when subscribing new users.",
      "label": "Double Opt-In",
      "type": "boolean"
    },
    "listId": {
      "default": "",
      "description": "You can find your List ID in your Mailchimp list's Settings pane under List Name & Defaults. Your list ID will be at the top of the right column.",
      "label": "List ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your List ID."
        ],
        [
          "regexp",
          "^[a-z0-9]+$",
          "Double-check your List ID. It should be a series of numbers and letters, like `1405f61a617`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/mailchimp-default.svg"
  },
  "id": "mailchimp"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/mailchimp-default.svg"
}

export default data
