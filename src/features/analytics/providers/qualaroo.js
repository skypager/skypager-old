export const id = "qualaroo"

export const data = {
  "name": "Qualaroo",
  "slug": "qualaroo",
  "createdAt": "2013-03-29T01:05:01Z",
  "note": "",
  "website": "http://qualaroo.com",
  "description": "Qualaroo is a user testing tool that lets you add a survey to any page on your site, so you can get targeted user feeback as the user is performing a task.",
  "level": 3,
  "categories": [
    "Surveys"
  ],
  "popularity": 0.013298735,
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
    "track": true
  },
  "basicOptions": [
    "customerId",
    "siteToken"
  ],
  "advancedOptions": [
    "track"
  ],
  "options": {
    "customerId": {
      "default": "",
      "description": "Your Customer ID is the **first** part of the end of your Qualaroo Javascript library URL. So if your URL is: `s3.amazonaws.com/ki.js/37282/9F2.js`, your Customer ID would be: `37282`.",
      "label": "Customer ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Qualaroo Customer ID."
        ]
      ]
    },
    "siteToken": {
      "default": "",
      "description": "Your Site Token is the **second** part of the end of your Qualaroo Javascript library URL. So if your URL is: `s3.amazonaws.com/ki.js/37282/9F2.js`, your Site Token would be: `9F2`.",
      "label": "Site Token",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Qualaroo Site Token."
        ],
        [
          "regexp",
          "^[a-zA-Z0-9-]+",
          "Please double check your Site Token. It should be a really short string, like: `9Z3`."
        ]
      ]
    },
    "track": {
      "default": false,
      "description": "By default Qualaroo only records a user's traits, not the events they trigger. If you'd like target a survey at users who've triggered a certain event, you'll want to enable this setting.",
      "label": "Record Events to Qualaroo",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/qualaroo-default.svg"
  },
  "id": "qualaroo"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/qualaroo-default.svg"
}

export default data
