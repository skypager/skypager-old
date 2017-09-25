export const id = "email-aptitude"

export const data = {
  "name": "Email Aptitude",
  "slug": "email-aptitude",
  "createdAt": "2014-08-28T23:26:27.136Z",
  "note": "",
  "website": "http://www.emailaptitude.com/",
  "description": "Email Aptitude is a professional services company and SaaS product that helps large ecommerce brands with their email strategy.",
  "level": 5,
  "categories": [
    "Email"
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
    "accountId"
  ],
  "advancedOptions": [],
  "options": {
    "accountId": {
      "default": "",
      "description": "Your Account ID from Email Aptitude, provided to you by your Email Aptitude account manager.",
      "label": "Account ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Account ID."
        ],
        [
          "regexp",
          "^EA-[a-zA-Z0-9]+$",
          "Please double check your Account ID. It should be a string starting with EA-, for example: EA-7CSV1X."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/email-aptitude-default.svg"
  },
  "id": "email-aptitude"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/email-aptitude-default.svg"
}

export default data
