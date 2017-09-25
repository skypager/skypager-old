export const id = "pardot"

export const data = {
  "name": "Pardot",
  "slug": "pardot",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://pardot.com",
  "description": "Pardot is a marketing analytics tool that lets you send automated emails to leads and track conversions in emails and across social networks.",
  "level": 4,
  "categories": [
    "Email"
  ],
  "popularity": 0.0038923128,
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
    "userKey",
    "piAId",
    "piCId",
    "email",
    "password"
  ],
  "advancedOptions": [],
  "options": {
    "email": {
      "default": "",
      "description": "Your account email.",
      "label": "Pardot Account Email",
      "private": true,
      "type": "string"
    },
    "password": {
      "default": "",
      "description": "Pardot requires we store a Pardot user email and password to access their API. For security, we recommend you add a new user to your Pardot account under **Admin > Users and Groups > Add User**, so that you don't have to tell us your actual password.",
      "label": "Pardot Account Password",
      "private": true,
      "type": "password"
    },
    "piAId": {
      "default": "",
      "description": "You can find your Account ID (or `piAId`) under **Marketing > Campaigns** in your [Pardot account](https://pi.pardot.com/campaign). After selecting your desired website campaign, press **View Tracking Code**.",
      "label": "Account ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Pardot Account ID."
        ],
        [
          "regexp",
          "^\\d+$",
          "Please double check your Account ID. It should be a series of numbers, like `91711`."
        ]
      ]
    },
    "piCId": {
      "default": "",
      "description": "You can find your Campaign ID (or `piCId`) under **Marketing > Campaigns** in your [Pardot account](https://pi.pardot.com/campaign). After selecting your desired website campaign, press **View Tracking Code**. _Note: you can still use a URL query parameter of `pi_campaign_id` to override this on specific pages._",
      "label": "Campaign ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Pardot Campaign ID."
        ],
        [
          "regexp",
          "^\\d+$",
          "Please double check your Campaign ID. It should be a series of numbers, like `3745`."
        ]
      ]
    },
    "userKey": {
      "default": "",
      "description": "You can find your User Key on under **User Settings** in your [Pardot account](https://pi.pardot.com/account).",
      "label": "User Key",
      "private": true,
      "type": "string",
      "validators": [
        [
          "regexp",
          "^[a-f0-9]{32}$",
          "Please double check your User Key. It should be a hexidecimal number, like `92b117ab9813ce62272f45c15b19862f`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/pardot-default.svg"
  },
  "id": "pardot"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/pardot-default.svg"
}

export default data
