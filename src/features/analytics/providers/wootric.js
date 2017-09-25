export const id = "wootric"

export const data = {
  "name": "Wootric",
  "slug": "wootric",
  "createdAt": "2015-06-02T17:18:19.833Z",
  "note": "",
  "website": "http://wootric.com",
  "description": "Wootric collects customer feedback inside your web application using the Net Promoter Score℠. Track ongoing NPS®, follow up with customers, and quickly surface insights in an easy-to-use dashboard.",
  "level": 3,
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
    "identify": true,
    "pageview": true,
    "track": false
  },
  "basicOptions": [
    "accountToken"
  ],
  "advancedOptions": [],
  "options": {
    "accountToken": {
      "default": "",
      "description": "You can find your account token in your Wootric Settings under 'Install JS Beacon'. It should look something like this: `NPS-4aeb53c1`.",
      "label": "Account Token",
      "private": false,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Wootric account token"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "alt": "https://s3.amazonaws.com/segmentio/logos/wootric-alt.png",
    "default": "https://s3.amazonaws.com/segmentio/logos/wootric-default.svg"
  },
  "id": "wootric"
}

export const logos = {
  "alt": "https://s3.amazonaws.com/segmentio/logos/wootric-alt.png",
  "default": "https://s3.amazonaws.com/segmentio/logos/wootric-default.svg"
}

export default data
