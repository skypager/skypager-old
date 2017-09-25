export const id = "alexa"

export const data = {
  "name": "Alexa",
  "slug": "alexa",
  "createdAt": "2014-04-07T09:47:41Z",
  "note": "",
  "website": "https://www.alexa.com",
  "description": "Get an insider's edge with Alexa's Competitive Intelligence toolkit. Uncover opportunities for competitive advantage, benchmark any site against its competitors and track companies over time.",
  "level": 1,
  "categories": [
    "Analytics"
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
    "account",
    "domain"
  ],
  "advancedOptions": [],
  "options": {
    "account": {
      "default": "",
      "description": "You can find your Account ID in the Javascript snippet, it appears as `atrk_acct: 'XXXXXXX'`.",
      "label": "Account ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Account ID"
        ]
      ]
    },
    "domain": {
      "default": "",
      "description": "You can find your Domain in the Javascript snippet, it appears as `domain: 'example.com'`",
      "label": "Domain",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your domain name."
        ],
        [
          "domain",
          "Please double check your domain name it should look something like `example.com` or `example.com.au`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/alexa-default.svg"
  },
  "id": "alexa"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/alexa-default.svg"
}

export default data
