export const id = "appsflyer"

export const data = {
  "name": "AppsFlyer",
  "slug": "appsflyer",
  "createdAt": "2014-08-27T23:02:41Z",
  "note": "",
  "website": "http://www.appsflyer.com/",
  "description": "Mobile app measurement and tracking.",
  "level": 3,
  "categories": [
    "Attribution"
  ],
  "popularity": 0,
  "platforms": {
    "browser": false,
    "mobile": true,
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
    "appleAppID",
    "appsFlyerDevKey",
    "httpFallback"
  ],
  "advancedOptions": [],
  "options": {
    "appleAppID": {
      "default": "",
      "description": "Your App's ID, which is accessible from iTunes. This is optional for Android projects, and only required for iOS projects.",
      "label": "Apple App ID (iOS)",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Apple App ID."
        ],
        [
          "regexp",
          "^[0-9]*$",
          "Please double check your App ID; it looks like it's misspelled. Here's an example: 34320065."
        ]
      ]
    },
    "appsFlyerDevKey": {
      "default": "",
      "description": "Your unique developer ID from AppsFlyer, which is accessible from your AppsFlyer account.",
      "label": "AppsFlyer Dev Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your AppsFlyer Dev Key."
        ],
        [
          "regexp",
          "^[a-zA-Z0-9]{10,30}$",
          "Please double check your Dev Key; it looks like it's misspelled. It should be a 22 character string, for example: pSX9JjSNkWUR8AJQQ7kPoE."
        ]
      ]
    },
    "httpFallback": {
      "default": false,
      "description": "If selected, HTTPS calls will fallback on HTTP",
      "label": "Enable HTTP fallback (Android)",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/appsflyer-default.svg"
  },
  "id": "appsflyer"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/appsflyer-default.svg"
}

export default data
