export const id = "facebook-custom-audiences"

export const data = {
  "name": "Facebook Custom Audiences",
  "slug": "facebook-custom-audiences",
  "createdAt": "2014-03-22T19:50:23Z",
  "note": "",
  "website": "https://developers.facebook.com/docs/ads-for-websites",
  "description": "The Facebook Website Custom Audiences integration lets you remarket to people who visit your website.",
  "level": 3,
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
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "pixelId"
  ],
  "advancedOptions": [],
  "options": {
    "pixelId": {
      "default": "",
      "description": "Your Pixel ID, from the snippet created on the [Facebook Custom Audiences page](https://www.facebook.com/ads/manage/audiences.php).",
      "label": "Pixel ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Pixel ID"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/facebook-custom-audiences-default.svg"
  },
  "id": "facebook-custom-audiences"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/facebook-custom-audiences-default.svg"
}

export default data
