export const id = "curebit"

export const data = {
  "name": "Curebit",
  "slug": "curebit",
  "createdAt": "2014-01-21T22:43:03Z",
  "note": "",
  "website": "http://www.curebit.com/",
  "description": "Curebit is a social marketing platform for ecommerce stores that increases revenue through referrals.",
  "level": 5,
  "categories": [
    "Referrals"
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
    "identify": false,
    "pageview": false,
    "track": false
  },
  "basicOptions": [
    "siteId",
    "campaigns"
  ],
  "advancedOptions": [
    "customUrl",
    "iframeWidth",
    "iframeHeight",
    "iframeBorder",
    "insertIntoId",
    "responsive",
    "device",
    "server"
  ],
  "options": {
    "campaigns": {
      "default": {},
      "description": "Each campaign runs at a specific url like /share or /invite. Map that url to the Curebit campaign_tags for that page.",
      "label": "Campaigns",
      "type": "text-map"
    },
    "customUrl": {
      "default": "",
      "description": "If Curebit supplies a custom URL from which to load your script, enter it here and we'll use that instead of the default. Please include the `//` prefix.",
      "label": "Custom Script URL",
      "type": "string",
      "validators": [
        [
          "regexp",
          "^//",
          "Please double check the custom URL. It should start with `//`."
        ]
      ]
    },
    "device": {
      "default": "",
      "description": "What device should it be sized for? If you're not sure see this [Help Page](https://curebit.helpjuice.com/questions/45313-Where-do-I-find-my-site-ID) from Curebit.",
      "label": "Device Sizing",
      "type": "string"
    },
    "iframeBorder": {
      "default": "0",
      "description": "Your IFrame Border, if you're not sure see this [Help Page](https://curebit.helpjuice.com/questions/45313-Where-do-I-find-my-site-ID) from Curebit.",
      "label": "IFrame Border",
      "type": "string"
    },
    "iframeHeight": {
      "default": "480",
      "description": "Your IFrame Height, if you're not sure see this [Help Page](https://curebit.helpjuice.com/questions/45313-Where-do-I-find-my-site-ID) from Curebit.",
      "label": "IFrame Height",
      "type": "string"
    },
    "iframeWidth": {
      "default": "100%",
      "description": "Your IFrame Width, if you're not sure see this [Help Page](https://curebit.helpjuice.com/questions/45313-Where-do-I-find-my-site-ID) from Curebit.",
      "label": "IFrame Width",
      "type": "string"
    },
    "insertIntoId": {
      "default": "",
      "description": "The ID of the HTML element where you would like to insert the Curebit IFrame.",
      "label": "ID to Insert Curebit",
      "type": "string"
    },
    "responsive": {
      "default": true,
      "description": "Should the IFrame be responsive? If you're not sure see this [Help Page](https://curebit.helpjuice.com/questions/45313-Where-do-I-find-my-site-ID) from Curebit.",
      "label": "Use a Responsive IFrame",
      "type": "boolean"
    },
    "server": {
      "default": "https://www.curebit.com",
      "description": "You can use your own domain if you have an enterprise Curebit account",
      "label": "Server",
      "type": "string",
      "validators": [
        [
          "domain",
          "Please enter a valid domain name, like `company.com`."
        ]
      ]
    },
    "siteId": {
      "default": "",
      "description": "Your Site ID, if you can't find it see this [Help Page](https://curebit.helpjuice.com/questions/45313-Where-do-I-find-my-site-ID) from Curebit.",
      "label": "Site ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Site ID"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/curebit-default.svg"
  },
  "id": "curebit"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/curebit-default.svg"
}

export default data
