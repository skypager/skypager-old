export const id = "gainsight"

export const data = {
  "name": "Gainsight",
  "slug": "gainsight",
  "createdAt": "2014-06-01T23:02:41Z",
  "note": "",
  "website": "http://www.gainsight.com/",
  "description": "Gainsight helps businesses reduce churn, increase up-sell and drive customer success. It integrates with salesforce to evaluate various sources of customer intelligence.",
  "level": 4,
  "categories": [
    "Customer Success"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": true,
    "group": true,
    "identify": true,
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "accessKey"
  ],
  "advancedOptions": [],
  "options": {
    "accessKey": {
      "default": "",
      "description": "It should be 36 characters long, and look something like this: `35a84f9e-7084-47a1-b8a5-593444e9e862`.",
      "label": "Access Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your access key."
        ],
        [
          "regexp",
          "^[a-z0-9-]{36}$",
          "Please double check your access key. It should be 36 characters long, and look something like this: `35a84f9e-7084-47a1-b8a5-593444e9e862`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/gainsight-default.svg"
  },
  "id": "gainsight"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/gainsight-default.svg"
}

export default data
