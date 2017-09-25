export const id = "zendesk"

export const data = {
  "name": "Zendesk",
  "slug": "zendesk",
  "createdAt": "2014-06-01T23:02:41Z",
  "note": "",
  "website": "http://www.zendesk.com/",
  "description": "Zendesk is a customer support helpdesk. This integration makes data about your customers visible in Zendesk.",
  "level": 3,
  "categories": [
    "Helpdesks"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": true,
    "identify": true,
    "pageview": false,
    "track": false
  },
  "basicOptions": [
    "email",
    "password",
    "subdomain"
  ],
  "advancedOptions": [],
  "options": {
    "email": {
      "default": "",
      "description": "Your Zendesk account email.",
      "label": "Email",
      "private": true,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Zendesk account email"
        ]
      ]
    },
    "password": {
      "default": "",
      "description": "Your Zendesk account password.",
      "label": "Password",
      "private": true,
      "type": "password",
      "validators": [
        [
          "required",
          "Please enter your Zendesk account password"
        ]
      ]
    },
    "subdomain": {
      "default": "",
      "description": "Your Zendesk subdomain, not including `.zendesk.com`.",
      "label": "Subdomain",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Zendesk subdomain"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/zendesk-default.svg"
  },
  "id": "zendesk"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/zendesk-default.svg"
}

export default data
