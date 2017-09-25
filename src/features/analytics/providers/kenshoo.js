export const id = "kenshoo"

export const data = {
  "name": "Kenshoo",
  "slug": "kenshoo",
  "createdAt": "2014-04-15T10:32:53Z",
  "note": "",
  "website": "http://www.kenshoo.com/",
  "description": "Kenshoo is a global software company that engineers cloud-based digital marketing solutions and predictive media optimization technology.",
  "level": 5,
  "categories": [
    "Advertising"
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
    "track": true
  },
  "basicOptions": [
    "subdomain",
    "cid",
    "events"
  ],
  "advancedOptions": [],
  "options": {
    "cid": {
      "default": "",
      "description": "You can find your CID in your Kenshoo snippet, it will be appended to the URL for example in this snippet `getpx.php?cid=xxxx` your `CID` is `xxxx`",
      "label": "CID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your CID."
        ]
      ]
    },
    "events": {
      "default": [],
      "description": "List any names you would like to call your different conversion events, such as `checkout`, `start order`, `completed order`, etc.",
      "label": "Conversion events",
      "type": "array"
    },
    "subdomain": {
      "default": "",
      "description": "You can find your Subdomain in your kenshoo snippet, for example in this snippet: `://xxxx.xg4ken` the subdomain is `xxxx`",
      "label": "Subdomain",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Subdomain."
        ],
        [
          "regexp",
          "^[0-9]+$",
          "Please double check your Subdomain, It should be a number like `1223`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/kenshoo-default.svg"
  },
  "id": "kenshoo"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/kenshoo-default.svg"
}

export default data
