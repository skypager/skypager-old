export const id = "google-analytics"

export const data = {
  "name": "Google Analytics",
  "slug": "google-analytics",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://google.com/analytics",
  "description": "Google Analytics is the most popular analytics tool for the web because it’s free and sports a wide range of features. It’s especially good at measuring traffic sources and ad campaigns.",
  "level": 1,
  "categories": [
    "Realtime Dashboards",
    "Analytics"
  ],
  "popularity": 1,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": false,
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "trackingId",
    "classic",
    "doubleClick",
    "mobileTrackingId",
    "serversideTrackingId"
  ],
  "advancedOptions": [
    "domain",
    "enhancedEcommerce",
    "ignoredReferrers",
    "trackNamedPages",
    "trackCategorizedPages",
    "includeSearch",
    "anonymizeIp",
    "enhancedLinkAttribution",
    "nonInteraction",
    "siteSpeedSampleRate",
    "serversideClassic",
    "sendUserId",
    "reportUncaughtExceptions",
    "dimensions",
    "metrics"
  ],
  "options": {
    "anonymizeIp": {
      "default": false,
      "description": "If you need to [anonymize IP addresses](https://support.google.com/analytics/answer/2763052?hl=en) sent to Google Analytics, enable this setting.",
      "label": "Anonymize IP Addresses",
      "type": "boolean"
    },
    "classic": {
      "default": false,
      "description": "**Important:** When creating your Google Analytics profile, you can choose between **Classic** and **Universal** Analytics. After March 2013, new profiles default to Universal, while earlier ones are Classic. An easy test: if you see `_gaq.push` in your code you're using Classic, so enable this.",
      "label": "Use Classic Analytics on Your Site",
      "type": "boolean"
    },
    "dimensions": {
      "default": {},
      "description": "Google Analytics only accepts numbered dimensions like `dimension3` and `dimension19`. When you `analytics.identify(userId, traits)` with custom traits, we need to map those traits to Google Analytics dimensions. Enter a trait name on the left, and the Google Analytics dimension you want on the right. Email [friends@segment.io](mailto:friends@segment.io) if you need help!",
      "label": "Custom Dimensions",
      "max": 200,
      "prefix": "dimension",
      "type": "map"
    },
    "domain": {
      "default": "",
      "description": "If you set the domain name, then _only data sent from visitors on that domain_ will be recorded. [Read our docs here](/docs/integrations/google-analytics/#cookie-domain-name). By default Google Analytics will resolve the domain name automatically, so you should **leave this blank unless you know you want otherwise**! This option is useful if you need to ignore data from other domains, or explicitly set the domain of your Google Analytics cookie. This is known as Override Domain Name in [GA Classic](https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingSite). If you are testing locally, you can set the domain to `none`.",
      "label": "Cookie Domain Name",
      "type": "string",
      "validators": [
        [
          "regexp",
          "^none$|^[a-zA-Z0-9_-]+\\.[.a-zA-Z0-9_-]+$",
          "Please enter a valid domain (don't include `http://`). It should be blank or look something like this: `sub.example.com`."
        ]
      ]
    },
    "doubleClick": {
      "default": false,
      "description": "This works with both Universal and Classic tracking methods.",
      "label": "Remarketing, Display Ads and Demographic Reports.",
      "type": "boolean"
    },
    "enhancedEcommerce": {
      "default": false,
      "description": "If you want more detailed reports on ecommerce, you might want to enable this feature. Read more about it [here](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce).",
      "label": "Enable Enhanced Ecommerce",
      "type": "boolean"
    },
    "enhancedLinkAttribution": {
      "default": false,
      "description": "If you want more detailed reports on the links clicked on your site, you might want to enable this feature. Read more about it [here](https://support.google.com/analytics/answer/2558867?hl=en).",
      "label": "Enable Enhanced Link Attribution",
      "type": "boolean"
    },
    "ignoredReferrers": {
      "default": [],
      "description": "Sometimes you want to Google Analytics to ignore certain referral domains, for example to prevent your subdomains from showing up as referrers in your analytics. Add any domains you want to ignore, separated by line breaks. _Note: this only works for Classic profiles. Universal profiles can [edit their ignored referrers](https://support.google.com/analytics/answer/2795830?hl=en&ref_topic=2790009) directly inside Google Analytics._",
      "label": "Ignored Referrers",
      "type": "strings"
    },
    "includeSearch": {
      "default": false,
      "description": "The querystring doesn't usually affect the content of the page in a significant way (like sorting), so we disable this by default.",
      "label": "Include the Querystring in Page Views",
      "type": "boolean"
    },
    "initialPageview": {
      "default": true,
      "description": "By default Google Analytics tracks a page view when the page loads. Disable this setting if you have a single page application where you call the [pageview method](https://segment.io/libraries/analytics.js#pageview) manually.",
      "label": "Track a Pageview on Load",
      "type": "boolean"
    },
    "metrics": {
      "default": {},
      "description": "Google Analytics only accepts numbered metrics like `metric2` and `metric14`. When you `analytics.track(event, properties)` an event with custom `properties` or `analytics.identify(userId, traits)` with custom traits, we need to map those properties and traits to Google Analytics metrics. Enter a property or trait name on the left, and the Google Analytics metric you want on the right. Email [friends@segment.io](mailto:friends@segment.io) if you need help!",
      "label": "Custom Metrics",
      "max": 200,
      "prefix": "metric",
      "type": "map"
    },
    "mobileTrackingId": {
      "default": "",
      "description": "Google Analytics tracks mobile apps separately, so you'll want to create a separate Google Analytics mobile app property. Leave it blank if you don't have a mobile app property.",
      "label": "Mobile Tracking ID",
      "type": "string",
      "validators": [
        [
          "regexp",
          "^UA-\\d+-\\d+$",
          "Please double check your Tracking ID; it might be mispelled. It should look something like: `UA-970334309-1`."
        ]
      ]
    },
    "nonInteraction": {
      "default": false,
      "description": "Enable this setting to add a noninteraction: 1 flag to every event tracked to Google Analytics. If you're seeing unusually low bounce rates this will solve that issue.",
      "label": "Add the non-interaction flag to all events",
      "type": "boolean"
    },
    "reportUncaughtExceptions": {
      "default": false,
      "description": "This lets you study errors and exceptions in your iOS and Android apps in Google Analytics.",
      "label": "Send Uncaught Exceptions to GA (Mobile)",
      "type": "boolean"
    },
    "sendUserId": {
      "default": false,
      "description": "User-ID enables the analysis of groups of sessions, across devices, using a unique and persistent ID. This only works with Google Analytics Universal. IMPORTANT: Sending email or other personally identifiable information (PII) violates Google Analytics Terms of Service.",
      "label": "Send User-ID to GA",
      "type": "boolean"
    },
    "serversideClassic": {
      "default": false,
      "description": "**Important:** When creating your Google Analytics profile, you can choose between **Classic** and **Universal** Analytics. After March 2013, new profiles default to Universal, while earlier ones are Classic. An easy test: if you see `_gaq.push` in your code you're using Classic, so enable this.",
      "label": "Use Classic Analytics for Your Serverside Tracking",
      "private": true,
      "type": "boolean"
    },
    "serversideTrackingId": {
      "default": "",
      "description": "Your Serverside Tracking ID is the UA code for the Google Analytics property you want to send server-side calls to. Leave it blank if you don't have a server-side client library that you want to send data from. Server-side data has limitations due to Google Analytics' API, so by default we leave this blank.",
      "label": "Serverside Tracking ID",
      "private": true,
      "type": "string",
      "validators": [
        [
          "regexp",
          "^UA-\\d+-\\d+$",
          "Please double check your Tracking ID; it might be mispelled. It should look something like: `UA-970334309-1`."
        ]
      ]
    },
    "siteSpeedSampleRate": {
      "default": 1,
      "description": "If you have a small number of visitors, and want to get increased the sample size for your [site speed stats](https://support.google.com/analytics/answer/1205784?ref_topic=1282106&rd=1), then increase this number.",
      "label": "Site Speed Sample Rate",
      "max": 100,
      "min": 1,
      "type": "number",
      "validators": [
        [
          "number",
          "Please double check your Sample Rate. It should be a whole number."
        ]
      ]
    },
    "trackCategorizedPages": {
      "default": true,
      "description": "This will track events to Google Analytics for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `category` associated with them. For example `page('Docs', 'Index')` would translate to **Viewed Docs Index Page**.",
      "label": "Track Categorized Pages",
      "type": "boolean"
    },
    "trackNamedPages": {
      "default": true,
      "description": "This will track events to Google Analytics for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `name` associated with them. For example `page('Signup')` would translate to **Viewed Signup Page**.",
      "label": "Track Named Pages",
      "type": "boolean"
    },
    "trackingId": {
      "default": "",
      "description": "Your website's Tracking ID is in the **Tracking Info** tab on the [Admin Page](https://www.google.com/analytics/web/#management/Property) of Google Analytics. Leave it blank if you don't have a website property.",
      "label": "Website Tracking ID",
      "type": "string",
      "validators": [
        [
          "regexp",
          "^UA-\\d+-\\d+$",
          "Please double check your Tracking ID; it might be mispelled. It should look something like: `UA-970334309-1`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/google-analytics-default.svg"
  },
  "id": "google-analytics"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/google-analytics-default.svg"
}

export default data
