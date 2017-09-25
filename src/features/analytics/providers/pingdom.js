export const id = "pingdom"

export const data = {
  "name": "Pingdom",
  "slug": "pingdom",
  "createdAt": "2013-04-20T01:10:45Z",
  "note": "",
  "website": "http://pingdom.com",
  "description": "Pingdom is an uptime and performance monitoring tool that lets you know when your website or API goes down or starts getting slow so you can fix the problem as soon as possible.",
  "level": 1,
  "categories": [
    "Error and Performance Monitoring"
  ],
  "popularity": 0.033084657,
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
    "id"
  ],
  "advancedOptions": [],
  "options": {
    "id": {
      "default": "",
      "description": "You can find your Real User Monitoring ID in your [Pingdom RUM dashboard](https://my.pingdom.com/rum) by clicking the **pencil icon** to get to the **Edit view**. Your ID will appear in the code snippet as `var _prum = ['id', 'YOURID']`.",
      "label": "Real User Monitoring ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Pingdom Real User Monitoring ID."
        ],
        [
          "regexp",
          "^[a-f0-9]{24}$",
          "Please double check your ID. It should be 24 characters long, and look something like this: `9268f8c6abe53db732000000`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/pingdom-default.svg"
  },
  "id": "pingdom"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/pingdom-default.svg"
}

export default data
