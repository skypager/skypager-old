export const id = "errorception"

export const data = {
  "name": "Errorception",
  "slug": "errorception",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://errorception.com",
  "description": "Errorception is a simple way to discover Javascript errors on your website. Any error that occurs will get sent to Errorception, so you can find out what's causing them.",
  "level": 2,
  "categories": [
    "Error and Performance Monitoring"
  ],
  "popularity": 0.046707753,
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
    "projectId"
  ],
  "advancedOptions": [
    "meta"
  ],
  "options": {
    "meta": {
      "default": true,
      "description": "When this option is enabled we will store metadata about the user on `identify` calls, using the [Errorception `meta` API](http://blog.errorception.com/2012/11/capture-custom-data-with-your-errors.html).",
      "label": "Include custom user data with Errorception's error tracking",
      "type": "boolean"
    },
    "projectId": {
      "default": "",
      "description": "You can find your Project ID under the **Settings** tab on the [Project page]() of your Errorception account. Your Project ID is the long hexadecimal number inside `_errs['PROJECT_ID']`. You can also just copy it out of your Errorception URL, `/projects/PROJECT_ID`. It should be 24 characters long and look something like this: `326b76b52f52c3f662000140`.",
      "label": "Project ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Project ID."
        ],
        [
          "regexp",
          "^[a-z0-9]{24}$",
          "Please double-check your Project ID; it looks like it's misspelled. It should be 24 characters long and look something like this: `326b76b52f52c3f662000140`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/errorception-default.svg"
  },
  "id": "errorception"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/errorception-default.svg"
}

export default data
