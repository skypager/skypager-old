export const id = "drip"

export const data = {
  "name": "Drip",
  "slug": "drip",
  "createdAt": "2013-11-12T20:26:28Z",
  "note": "",
  "website": "http://mbsy.co/lqb7",
  "description": "Drip is an automated email tool that lets you set up a drip campaign on your site in a few minutes. After a user signs up, it'll send them the next email in your series every few days.",
  "level": 3,
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
    "alias": false,
    "group": false,
    "identify": true,
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "account",
    "token"
  ],
  "advancedOptions": [],
  "options": {
    "account": {
      "default": "",
      "description": "Your account ID can be found on your [Site Setup](https://www.getdrip.com/settings/site) page under **3rd-Party Integrations**. It should be a 7 to 8 character numerical string, like this: `83702741`.",
      "label": "Account Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Drip Account Key"
        ],
        [
          "regexp",
          "^[0-9]{7,8}$",
          "Please double check your Account Key. It should be a 7 to 8 character numerical string, like this: `83702741`."
        ]
      ]
    },
    "campaignId": {
      "default": "",
      "description": "You campaign ID can be found in your [Campaigns](https://www.getdrip.com/campaigns) page. Copy a campaign URL, the campaign ID will be the last segment of that url e.g (https://www.getdrip.com/<account_id>/campaigns/<campaign_id>).",
      "label": "Campaign ID",
      "type": "string",
      "validators": [
        [
          "regexp",
          "^[0-9]{7,8}$",
          "Please double check your Campaign ID. It should be a 7 to 8 character numerical string, like this: `83712741`."
        ]
      ]
    },
    "token": {
      "default": "",
      "description": "Your API Token can be found in your [User Settings](https://www.getdrip.com/user/edit). It should be 20 character alphanumeric string, like: `bmrdc6hczyn8yss8o8td`.",
      "label": "API Token",
      "type": "string",
      "validators": [
        [
          "regexp",
          "^[a-zA-Z0-9]{20}$",
          "Please double check your API Token, it should look something like this: `bmrdc6hczyn8yss8o8td`"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/drip-default.svg"
  },
  "id": "drip"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/drip-default.svg"
}

export default data
