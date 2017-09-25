export const id = "help-scout"

export const data = {
  "name": "Help Scout",
  "slug": "help-scout",
  "createdAt": "2013-09-03T18:07:33Z",
  "note": "",
  "website": "http://helpscout.net",
  "description": "Help Scout is an incredibly simple, transparent customer support system that integrates directly with regular email, so your users won't notice a thing.",
  "level": 2,
  "categories": [
    "Helpdesks"
  ],
  "popularity": 0.0071359067,
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
    "apiKey"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can find your API Key on the Help Scout API keys page by navigating there from the [Help Scout Dashboard](https://secure.helpscout.net/dashboard/). Go to the **user icon** in the upper-right corner, and click **Your Profile** and then **API Keys** and generate a new API key or grab your existing one. It should be 40 characters long, and look something like this: `19a568052a40916806975825946d1a0e39c721d6`.",
      "label": "API Key",
      "private": true,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Help Scout API Key."
        ],
        [
          "regexp",
          "^[a-z0-9]{40}$",
          "Please double check your API Key. It should be 40 characters long, and look something like this: `19a568052a40916806975825946d1a0e39c721d6`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/help-scout-default.svg"
  },
  "id": "help-scout"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/help-scout-default.svg"
}

export default data
