export const id = "supporthero"

export const data = {
  "name": "SupportHero",
  "slug": "supporthero",
  "createdAt": "2015-04-22T15:01:12.274Z",
  "note": "",
  "website": "https://supporthero.io/",
  "description": "Support Hero works hand-in-hand with Zendesk: it helps you better understand how your self help knowledge base is performing and improve it over time.",
  "level": 3,
  "categories": [
    "Helpdesks"
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
      "description": "Your token can be found under the Integrations page of your Support Hero account, in the Segment integration section. It should look like  'Y3xrZW51SWQ9MjcmaG9zdE5hbWU5c2VnbWVudHRld3Quc3VwcG9ydGhlcm8uaW9'",
      "label": "Token",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Token"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/supporthero-default.svg"
  },
  "id": "supporthero"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/supporthero-default.svg"
}

export default data
