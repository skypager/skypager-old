export const id = "hubspot"

export const data = {
  "name": "HubSpot",
  "slug": "hubspot",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://www.hubspot.com",
  "description": "HubSpot is an all-in-one marketing tool that helps attract new leads and convert them into paying customers, with features like landing page creation and email automation.",
  "level": 3,
  "categories": [
    "Analytics",
    "Email",
    "CRMs"
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
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "portalId",
    "apiKey"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can request your API Key from HubSpot by filling out their API Key request form at [app.hubspot.com/keys/get](https://app.hubspot.com/keys/get). **Don't** use the temporary authorization code from **Settings > API Access**! It should look something like this: `dfdbfe6f-e7bf-4938-8e82-7d1938e48ab8`",
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
          "^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$",
          "Please double check your API Key. It should look something like this: `dfdbfe6f-e7bf-4938-8e82-7d1938e48ab8`."
        ]
      ]
    },
    "portalId": {
      "default": "",
      "description": "You can find your Hub ID on the **Settings** page of your [HubSpot account](http://help.hubspot.com/articles/KCS_Article/Account/Where-can-I-find-my-HUB-ID). It should be a series of numbers, like `997086`.",
      "label": "Hub ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Portal ID."
        ],
        [
          "regexp",
          "^\\d+$",
          "Double-check your Portal ID. It should be a series of numbers, like `997086`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/hubspot-default.svg"
  },
  "id": "hubspot"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/hubspot-default.svg"
}

export default data
