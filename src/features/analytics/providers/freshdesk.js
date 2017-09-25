export const id = "freshdesk"

export const data = {
  "name": "Freshdesk",
  "slug": "freshdesk",
  "createdAt": "2015-05-27T23:01:12.274Z",
  "note": "",
  "website": "https://freshdesk.com/",
  "description": "Freshdesk enables companies to provide multichannel support via phone, email, chat, website, social networks and mobile apps",
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
    "apiKey",
    "subdomain"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "Go to your profile settings page and your API key will be available below the change password section to your right",
      "label": "API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your API key"
        ]
      ]
    },
    "direct": {
      "default": true,
      "private": true,
      "type": "boolean"
    },
    "endpoint": {
      "default": "https://{{ subdomain }}.freshdesk.com/integrations/segment.json",
      "type": "string"
    },
    "subdomain": {
      "default": "",
      "description": "The site subdomain. So if your domain is `segment.freshdesk.com`, insert `segment`",
      "label": "Subdomain",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your subdomain"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/freshdesk-default.svg"
  },
  "id": "freshdesk"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/freshdesk-default.svg"
}

export default data
