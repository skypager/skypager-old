export const id = "track-js"

export const data = {
  "name": "Track JS",
  "slug": "track-js",
  "createdAt": "2014-04-07T13:39:24Z",
  "note": "",
  "website": "http://trackjs.com/",
  "description": "JavaScript Error and Event Tracking for Modern JavaScript Websites and Applications.",
  "level": 2,
  "categories": [
    "Error and Performance Monitoring"
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
    "track": false
  },
  "basicOptions": [
    "token"
  ],
  "advancedOptions": [
    "enabled",
    "application",
    "callbackEnabled",
    "callbackBindStack",
    "consoleEnabled",
    "consoleDisplay",
    "consoleError",
    "networkEnabled",
    "networkError",
    "visitorEnabled",
    "windowEnabled"
  ],
  "options": {
    "application": {
      "default": "",
      "description": "Optional. The name of the section of your application that this Segment project encompasses. For more info [see here](https://docs.trackjs.com/Examples/Multiple_Applications)",
      "label": "Application Key",
      "type": "string"
    },
    "callbackBindStack": {
      "default": false,
      "description": "Whether TrackJS should record the stacktrace for how a callback came to be bound, allowing the creation of an 'async stacktrace' in the TrackJS UI. This gives you more context of how the application arrived at the function that failed. Enabling this has a nontrivial performance penalty, test before enabling in production",
      "label": "Callback BindStack",
      "type": "boolean"
    },
    "callbackEnabled": {
      "default": true,
      "description": "Whether TrackJS should watch for errors on host-function callbacks, such as addEventListener, and setTimeout. Disabling this greatly decreases the likelihood of recording a stacktrace for an error.",
      "label": "Callback Enabled",
      "type": "boolean"
    },
    "consoleDisplay": {
      "default": true,
      "description": "Whether calls to console.log and other console functions should be displayed into the browser's console.",
      "label": "Console Display",
      "type": "boolean"
    },
    "consoleEnabled": {
      "default": true,
      "description": "Whether TrackJS should wrap and watch the console for events. If disabled, window.console is not guaranteed to exist in all browsers.",
      "label": "Console Enabled",
      "type": "boolean"
    },
    "consoleError": {
      "default": true,
      "description": "Whether TrackJS should transmit errors on calls to console.error.",
      "label": "Console Error",
      "type": "boolean"
    },
    "enabled": {
      "default": true,
      "description": "Whether to enable TrackJS for the page. If false, the TrackJS watchers will not be set up. The window.trackJs API will still be available and function locally, but no errors will be transmitted from the browser",
      "label": "Enabled",
      "legend": "",
      "type": "boolean"
    },
    "networkEnabled": {
      "default": true,
      "description": "Whether TrackJS should wrap and watch AJAX calls. If disabled, network events will not appear in your Telemetry Timeline.",
      "label": "Network Enabled",
      "type": "boolean"
    },
    "networkError": {
      "default": true,
      "description": "Whether TrackJS should transmit errors when an AJAX call completes with a 'failing' status code, 400 or greater. If you wish to customize the list of status codes you want to capture errors from, set this to true and filter out status codes using the onError callback.",
      "label": "Network Error",
      "type": "boolean"
    },
    "token": {
      "default": "",
      "description": "You can find your token under Track JS [setup page](https://my.trackjs.com/customer/setup#install-locally).",
      "label": "Token",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your token"
        ],
        [
          "regexp",
          "^[a-z0-9A-Z]{32}$",
          "Please double-check your token, it should be 32 characters long and look something like `c15932a25c4649f9b3505ab5c62b0ea5`"
        ]
      ]
    },
    "visitorEnabled": {
      "default": true,
      "description": "Whether TrackJS should watch visitor interaction events, such as clicks and field input.",
      "label": "Visitor Enabled",
      "type": "boolean"
    },
    "windowEnabled": {
      "default": true,
      "description": "Whether TrackJS should watch window.onerror for global errors",
      "label": "Window Enabled",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/trackjs-default.svg"
  },
  "id": "track-js"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/trackjs-default.svg"
}

export default data
