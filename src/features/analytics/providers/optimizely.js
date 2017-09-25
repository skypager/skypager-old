export const id = "optimizely"

export const data = {
  "name": "Optimizely",
  "slug": "optimizely",
  "createdAt": "2013-05-15T07:17:41Z",
  "note": "Optimizely works differently than other integrations. Their javascript is synchronous, so you'll need to drop their javascript snippet onto the page outside of Segment as the first item in the head tag. As soon as you do that, we'll send custom events through to Optimizely to help you measure A/B test conversions, and we'll pass the A/B test experiment variations through to your other tools for deeper downstream analysis.",
  "website": "http://optimizely.com",
  "description": "Optimizely is a dead-simple A/B testing tool that lets your marketing team test changes on your website in a WYSIWYG editor without having to write any code. Segment will pass events and traits to Optimizely, and send experiment variations to other tools.",
  "level": 3,
  "categories": [
    "A/B Testing",
    "Personalization"
  ],
  "popularity": 0.02692183,
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
    "track": true
  },
  "basicOptions": [
    "variations",
    "trackNamedPages",
    "trackCategorizedPages",
    "listen"
  ],
  "advancedOptions": [],
  "options": {
    "listen": {
      "default": false,
      "description": "Sends the experiment and variation information as properties on a track call.",
      "label": "Send experiment data to other tools (as a track call)",
      "type": "boolean"
    },
    "trackCategorizedPages": {
      "default": true,
      "description": "This will track events to Optimizely for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `category` associated with them. For example `page('Docs', 'Index')` would translate to **Viewed Docs Index Page**.",
      "label": "Track Categorized Pages",
      "type": "boolean"
    },
    "trackNamedPages": {
      "default": true,
      "description": "This will track events to Optimizely for [`page` method](https://segment.io/libraries/analytics.js#page) calls that have a `name` associated with them. For example `page('Signup')` would translate to **Viewed Signup Page**.",
      "label": "Track Named Pages",
      "type": "boolean"
    },
    "variations": {
      "default": true,
      "description": "Sends the experiment id and variation name as traits on the identify call.",
      "label": "Send experiment data to other tools (as an identify call)",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/optimizely-default.svg"
  },
  "id": "optimizely"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/optimizely-default.svg"
}

export default data
