export const id = "webengage"

export const data = {
  "name": "WebEngage",
  "slug": "webengage",
  "createdAt": "2013-12-11T22:44:43Z",
  "note": "",
  "website": "http://webengage.com",
  "description": "WebEngage is a tool that lets you collect feedback, and setup surveys that help you understand what engages your users, so you can retain them better.",
  "level": 2,
  "categories": [
    "Surveys"
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
    "page": false,
    "track": false
  },
  "basicOptions": [
    "licenseCode"
  ],
  "advancedOptions": [],
  "options": {
    "licenseCode": {
      "default": "",
      "description": "You can find your License Code in your WebEngage account.",
      "label": "License Code",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your WebEngage License Code."
        ],
        [
          "regexp",
          "^(~?[0-9a-zA-Z]+)$",
          "Please double check your License Code. It should look something like `~2024c003`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/webengage-default.svg"
  },
  "id": "webengage"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/webengage-default.svg"
}

export default data
