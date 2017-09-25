export const id = "gosquared"

export const data = {
  "name": "GoSquared",
  "slug": "gosquared",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://gosquared.com",
  "description": "GoSquared offers real-time user-level analytics for sites and apps. With people analytics, powerful filtering, events and e-commerce tracking, GoSquared puts all your user data in one place.",
  "level": 1,
  "categories": [
    "Realtime Dashboards",
    "Analytics"
  ],
  "popularity": 0.08595524,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": false,
    "pageview": false,
    "track": false
  },
  "basicOptions": [
    "apiSecret",
    "apiKey"
  ],
  "advancedOptions": [
    "anonymizeIP",
    "cookieDomain",
    "useCookies",
    "trackHash",
    "trackLocal",
    "trackParams"
  ],
  "options": {
    "anonymizeIP": {
      "default": false,
      "description": "Enable if you need to anonymize the IP address of visitors to your website.",
      "label": "Anonymize IP",
      "type": "boolean"
    },
    "apiKey": {
      "default": "",
      "description": "Generate your server-side API key here: https://www.gosquared.com/settings/api",
      "label": "API Key (Server-side)",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your API Key"
        ]
      ]
    },
    "apiSecret": {
      "default": "",
      "description": "You can find your Site Token by viewing the GoSquared [Integration guide](https://www.gosquared.com/integration/). It should look something like `GSN-123456-A`.",
      "label": "Site Token",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Site Token"
        ],
        [
          "regexp",
          "^GSN-\\d{6}-[A-Z]$",
          "Please double check your Site Token; it looks misspelled. It should look something like this: `GSN-951209-L`."
        ]
      ]
    },
    "cookieDomain": {
      "default": "",
      "description": "Use this if you wish to share GoSquared’s tracking cookies across subdomains, `.example.com` will enable shared tracking across all example’s subdomains. By default, cookies are set on the current domain (including subdomain) only.",
      "label": "Cookie Domain",
      "type": "string",
      "validators": [
        [
          "regexp",
          "^[.a-zA-Z0-9_-]+\\.[.a-zA-Z0-9_-]+$",
          "Please enter a valid domain name like `.example.com` or `example.com`"
        ]
      ]
    },
    "direct": {
      "default": true,
      "private": true,
      "type": "boolean"
    },
    "directChannels": {
      "default": [
        "mobile",
        "server"
      ]
    },
    "endpoint": {
      "default": "https://webhook.gosquared.com/segment",
      "type": "string"
    },
    "trackHash": {
      "default": false,
      "description": "Enable if you'd like page hashes to be tracked alongside the page URL. By default, `example.com/about#us` will be tracked as `example.com/about`.",
      "label": "Track Hash",
      "type": "boolean"
    },
    "trackLocal": {
      "default": false,
      "description": "Enable to track data on local pages/sites (using the `file://` protocol, or on `localhost`). This helps prevent local development from polluting your stats.",
      "label": "Track Local",
      "type": "boolean"
    },
    "trackParams": {
      "default": true,
      "description": "Disable to ignore URL querystring parameters from the page URL, for example `/home?my=query&string=true` will be tracked as `/home` if this is set to disabled.",
      "label": "Track Parameters",
      "type": "boolean"
    },
    "useCookies": {
      "default": true,
      "description": "Disable this if you don't want to use cookies",
      "label": "Use Cookies",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "alt": "https://s3.amazonaws.com/segmentio/logos/gosquared-alt.png",
    "default": "https://s3.amazonaws.com/segmentio/logos/gosquared-default.svg"
  },
  "id": "gosquared"
}

export const logos = {
  "alt": "https://s3.amazonaws.com/segmentio/logos/gosquared-alt.png",
  "default": "https://s3.amazonaws.com/segmentio/logos/gosquared-default.svg"
}

export default data
