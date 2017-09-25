export const id = "piwik"

export const data = {
  "name": "Piwik",
  "slug": "piwik",
  "createdAt": "2014-04-15T10:25:21Z",
  "note": "",
  "website": "http://piwik.org/",
  "description": "Piwik is the leading open source web analytics platform that gives you valuable insights into your website’s visitors, your marketing campaigns and much more, so you can optimize your strategy and online experience of your visitors.",
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
    "pageview": true,
    "track": false
  },
  "basicOptions": [
    "siteId",
    "url",
    "goals"
  ],
  "advancedOptions": [
    "customVariableLimit"
  ],
  "options": {
    "customVariableLimit": {
      "default": "5",
      "description": "If you have manually changed your Piwik custom variable limit, please enter your new value here. The Piwik default is 5.",
      "label": "Custom Variable Limit",
      "type": "number",
      "validators": []
    },
    "goals": {
      "default": {},
      "description": "Piwik only allows for goal ID's, when you `track('event')` we need to map `event` to a goal ID, enter event names on the left and goal ID's on the right.",
      "label": "Goals",
      "type": "text-map",
      "validators": []
    },
    "siteId": {
      "default": "",
      "description": "You can find your Site ID in your piwik snippet.",
      "label": "Site ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Site ID."
        ]
      ]
    },
    "url": {
      "default": "",
      "description": "You can find your Server URL in your snippet, we will append `/piwik.php` to the URL automatically.",
      "label": "Server URL",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Server URL."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/piwik-default.svg"
  },
  "id": "piwik"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/piwik-default.svg"
}

export default data
