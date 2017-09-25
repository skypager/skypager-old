export const id = "chartbeat"

export const data = {
  "name": "Chartbeat",
  "slug": "chartbeat",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://chartbeat.com",
  "description": "Chartbeat is a real-time dashboard for your team. It lets you see how many users are browsing around the different parts of your site or mobile app in real-time!",
  "level": 2,
  "categories": [
    "Realtime Dashboards"
  ],
  "popularity": 0.054816738,
  "platforms": {
    "browser": true,
    "mobile": false,
    "server": false
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": false,
    "pageview": true,
    "track": false
  },
  "basicOptions": [
    "uid",
    "domain"
  ],
  "advancedOptions": [
    "video"
  ],
  "options": {
    "domain": {
      "default": "",
      "description": "The same domain name you entered when adding your site's dashboard to Chartbeat. Don't include the `www.` because Chartbeat handles that for you automatically.",
      "label": "Domain",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Chartbeat site's domain name."
        ],
        [
          "regexp",
          "^(?!www\\.)",
          "Don't include the `www.` because Chartbeat will handle that for you automatically."
        ],
        [
          "domain",
          "Please enter a valid domain name, like `company.com`."
        ]
      ]
    },
    "uid": {
      "default": "",
      "description": "You can find your UID on the Chartbeat [Adding The Code](https://chartbeat.com/docs/adding_the_code/) page.",
      "label": "UID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Chartbeat site's UID."
        ],
        [
          "regexp",
          "^\\d+$",
          "Double-check your UID. It should be a series of numbers, like `98923`."
        ]
      ]
    },
    "video": {
      "default": false,
      "description": "If you select this option, we'll load `chartbeat_video.js` instead of `chartbeat.js`. The video library has the ability to listen for play/pause events from HTML5 `video` tags and common 3rd party video players.",
      "label": "Use Chartbeat Video Script",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/chartbeat-default.svg"
  },
  "id": "chartbeat"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/chartbeat-default.svg"
}

export default data
