export const id = "zopim"

export const data = {
  "name": "Zopim",
  "slug": "zopim",
  "createdAt": "2015-02-24T06:38:14.534Z",
  "note": "",
  "website": "http://Zopim.com",
  "description": "Zopim is a customer support tool that lets you connect with your customers in real time.",
  "level": 2,
  "categories": [
    "Helpdesks",
    "Customer Success"
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
    "zopimId"
  ],
  "advancedOptions": [
    "listen"
  ],
  "options": {
    "listen": {
      "default": false,
      "description": "Record Live Chat Conversation events from Zopim.",
      "label": "Record live chat events.",
      "type": "boolean"
    },
    "zopimId": {
      "default": "",
      "description": "Your Zopim ID appears in your Zopim widget. Look for `$.src` in your widget; in an example widget, the last set of characters like `2oA6WC5DSCdcyxVBS1mz75EJBU9cKLXU` is your ID.",
      "label": "Zopim ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Zopim ID."
        ],
        [
          "regexp",
          "^[a-zA-Z0-9]+$",
          "Please double check your Zopim ID. It should look something like this: `3zF6WD8DJQdcfxVzS1mz95EJBUz0KLXUGf99Sxi5JFN8oC8JpciLZg`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/Zopim-default.svg"
  },
  "id": "zopim"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/Zopim-default.svg"
}

export default data
