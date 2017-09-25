export const id = "quantcast"

export const data = {
  "name": "Quantcast",
  "slug": "quantcast",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://quantcast.com",
  "description": "Quantcast is an audience measurement tool that captures demographic and traffic data about the visitors to your site, to make sure your ads are targeted at the right people.",
  "level": 1,
  "categories": [
    "Advertising"
  ],
  "popularity": 0.023678236,
  "platforms": {
    "browser": true,
    "mobile": true,
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
    "pCode",
    "apiKey"
  ],
  "advancedOptions": [
    "advertise"
  ],
  "options": {
    "advertise": {
      "default": false,
      "description": "By default data will be sent to Quantcast Measure, enable this option to send to Quantcast Advertise",
      "label": "Advertise",
      "type": "boolean"
    },
    "apiKey": {
      "default": "",
      "description": "Only required for mobile apps. You can find your API Key in the right-hand column under **Your API Key** after you login to [Quantcast](https://www.quantcast.com/).",
      "label": "API Key",
      "type": "string"
    },
    "pCode": {
      "default": "",
      "description": "You can find your P-Code in the right-hand column under **Your P-Code** after you login to [Quantcast](https://www.quantcast.com/).",
      "label": "P-Code",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Quantcast P-Code."
        ],
        [
          "regexp",
          "^p-[^\\s]{13}$",
          "Please double check your P-Code. It should be 15 characters long, and look something like this: `p-AIsjJUtp583Se`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/quantcast-default.svg"
  },
  "id": "quantcast"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/quantcast-default.svg"
}

export default data
