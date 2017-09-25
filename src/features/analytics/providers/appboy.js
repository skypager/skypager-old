export const id = "appboy"

export const data = {
  "name": "Appboy",
  "slug": "appboy",
  "createdAt": "2015-02-26T17:06:57Z",
  "note": "",
  "website": "http://appboy.com",
  "description": "Appboy lets you understand, engage, monetize and maximize the lifetime value of your app users.",
  "level": 3,
  "categories": [
    "Email",
    "Push Notifications"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": true,
    "identify": true,
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "appGroupId",
    "updateExistingOnly"
  ],
  "advancedOptions": [],
  "options": {
    "appGroupId": {
      "default": "",
      "description": "The App Group Identifier can be found in your Appboy dashboard under App Settings > Developer Console",
      "label": "App Group Identifier",
      "type": "string"
    },
    "updateExistingOnly": {
      "default": false,
      "description": "A flag to determine whether to update existing users only, defaults to false",
      "label": "Update Existing Users Only",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/appboy-default.svg"
  },
  "id": "appboy"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/appboy-default.svg"
}

export default data
