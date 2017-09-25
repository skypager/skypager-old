export const id = "heap"

export const data = {
  "name": "Heap",
  "slug": "heap",
  "createdAt": "2013-03-29T01:05:01Z",
  "note": "",
  "website": "http://heapanalytics.com",
  "description": "Heap is an analytics tool that automatically tracks all of the actions your users perform just by flipping a switch, instead of after adding custom tracking code.",
  "level": 1,
  "categories": [
    "Analytics"
  ],
  "popularity": 0.017839767,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": true,
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "appId"
  ],
  "advancedOptions": [],
  "options": {
    "appId": {
      "default": "",
      "description": "You can find the snippet containing your app ID in Heap's [QuickStart docs](https://heapanalytics.com/docs#quickstart). It's inside the `heap.load('YOUR_APP_ID')` function call.",
      "label": "App ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Heap app ID."
        ],
        [
          "regexp",
          "^\\d+$",
          "Please double check your app ID. It should be a long number like this: `9709709783`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/heap-default.svg"
  },
  "id": "heap"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/heap-default.svg"
}

export default data
