export const id = "fullstory"

export const data = {
  "name": "FullStory",
  "slug": "fullstory",
  "createdAt": "2014-10-03T18:47:24Z",
  "note": "",
  "website": "http://fullstory.com",
  "description": "FullStory lets product and support teams easily understand everything about the customer experience.",
  "level": 3,
  "categories": [
    "Heatmaps and Recordings"
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
    "org"
  ],
  "advancedOptions": [
    "debug"
  ],
  "options": {
    "debug": {
      "default": false,
      "description": "This will enable FullStory's debug mode",
      "label": "Enter FS debug mode",
      "type": "boolean"
    },
    "org": {
      "default": "",
      "description": "You can find your _fs_org on the FullStory settings page by logging into your account, clicking the settings icon on the bottom left, and looking in the recording snippet for window['_fs_org']",
      "label": "FS Org",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your _fs_org"
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/fullstory-default.svg"
  },
  "id": "fullstory"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/fullstory-default.svg"
}

export default data
