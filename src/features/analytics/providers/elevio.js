export const id = "elevio"

export const data = {
  "name": "Elevio",
  "slug": "elevio",
  "createdAt": "2015-06-02T18:36:29.894Z",
  "note": "",
  "website": "http://elev.io",
  "description": "Use elevio to show an entire knowledge base, on every page of your site.",
  "level": 3,
  "categories": [
    "Helpdesks"
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
    "identify": true,
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
      "description": "You can find your account ID on your elevio widget settings page.",
      "label": "Account Id",
      "private": false,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Elevio account id"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "alt": "https://s3.amazonaws.com/segmentio/logos/elevio-alt.png",
    "default": "https://s3.amazonaws.com/segmentio/logos/elevio-default.svg"
  },
  "id": "elevio"
}

export const logos = {
  "alt": "https://s3.amazonaws.com/segmentio/logos/elevio-alt.png",
  "default": "https://s3.amazonaws.com/segmentio/logos/elevio-default.svg"
}

export default data
