export const id = "perfect-audience"

export const data = {
  "name": "Perfect Audience",
  "slug": "perfect-audience",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://perfectaudience.com",
  "description": "Perfect Audience is a Facebook retargeting tool that lets you display advertisements on Facebook to users who have visited your site before, increasing the likelyhood they'll convert.",
  "level": 3,
  "categories": [
    "Advertising"
  ],
  "popularity": 0.020434642,
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
    "track": true
  },
  "basicOptions": [
    "siteId"
  ],
  "advancedOptions": [],
  "options": {
    "siteId": {
      "default": "",
      "description": "You can find your Site ID by going to **Manage > Site Tracking Tag** and looking in the top-right corner for **'Site ID'**. It should be 24 characters long, and look something like this: `43c4b9f66d5f88435700003c`.",
      "label": "Site ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Perfect Audience Site ID."
        ],
        [
          "regexp",
          "^[a-f0-9]{24}$",
          "Please double check your Site ID. It should be 24 characters long, and look something like this: `43c4b9f66d5f88435700003c`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/perfect-audience-default.svg"
  },
  "id": "perfect-audience"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/perfect-audience-default.svg"
}

export default data
