export const id = "webhooks"

export const data = {
  "name": "Webhooks",
  "slug": "webhooks",
  "createdAt": "2013-05-16T23:14:00Z",
  "note": "",
  "website": "https://segment.com/docs/integrations/webhooks/",
  "description": "Webhooks are an easy way to add your own custom analytics hooks to the data you're sending to Segment! We'll forward your data to any URL endpoint you provide us.",
  "level": 1,
  "categories": [
    "Raw Data"
  ],
  "popularity": 0.01070386,
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
    "globalHook"
  ],
  "advancedOptions": [],
  "options": {
    "globalHook": {
      "default": "",
      "description": "The full URL (with http/https protocol) that we can send data to. eg. https://webhooks.company.com/analytics.",
      "label": "Webhook URL",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Webhook URL."
        ],
        [
          "url",
          "Please enter a valid URL, starting with `http://` or `https://`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/webhooks-default.svg"
  },
  "id": "webhooks"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/webhooks-default.svg"
}

export default data
