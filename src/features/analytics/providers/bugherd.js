export const id = "bugherd"

export const data = {
  "name": "BugHerd",
  "slug": "bugherd",
  "createdAt": "2013-03-29T01:05:01Z",
  "note": "",
  "website": "http://bugherd.com",
  "description": "BugHerd is a bug tracking software that lets users report bugs right in your interface. Once reported, you get a Trello-like management interface for taking care of the issues.",
  "level": 2,
  "categories": [
    "Error and Performance Monitoring"
  ],
  "popularity": 0.008108985,
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
    "apiKey"
  ],
  "advancedOptions": [
    "showFeedbackTab"
  ],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can find your API Key under the **Install BugHerd** tab on your BugHerd [Project page](http://bugherd.com/). It will appear in your tracking code as `?apikey=...`",
      "label": "API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your BugHerd API Key."
        ],
        [
          "regexp",
          "^[a-z0-9]{22}$",
          "Please double check your API Key. It should be 22 characters long, and look something like this: `lkstxbku9i0k5eexzmsjha`."
        ]
      ]
    },
    "showFeedbackTab": {
      "default": true,
      "description": "You should only disable this setting if you want to [build your own feedback tab](http://support.bugherd.com/entries/21497629-Create-your-own-Send-Feedback-tab) with the BugHerd API.",
      "label": "Show the Default Feedback Tab",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/bugherd-default.svg"
  },
  "id": "bugherd"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/bugherd-default.svg"
}

export default data
