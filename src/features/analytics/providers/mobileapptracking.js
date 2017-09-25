export const id = "mobileapptracking"

export const data = {
  "name": "MobileAppTracking",
  "slug": "mobileapptracking",
  "createdAt": "2014-10-17T22:38:05.528Z",
  "note": "The MAT integration requires you to use our Android (2.5.2+) and iOS SDKs (1.6.11+) versions. For install attribution please read through the documentation first.",
  "website": "http://www.mobileapptracking.com/",
  "description": "Attribution analytics to measure the value of your advertising partners",
  "level": 3,
  "categories": [
    "Attribution"
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
    "identify": false,
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "advertiserId"
  ],
  "advancedOptions": [],
  "options": {
    "advertiserId": {
      "default": "",
      "description": "You can find your Advertiser ID in your MobileAppTracking [account](https://platform.mobileapptracking.com/login?r=/login) under Accounts > Advertiser Account",
      "label": "Advertiser ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Advertiser ID"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/mobile-app-tracking-default.svg"
  },
  "id": "mobileapptracking"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/mobile-app-tracking-default.svg"
}

export default data
