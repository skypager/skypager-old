export const id = "visual-website-optimizer"

export const data = {
  "name": "Visual Website Optimizer",
  "slug": "visual-website-optimizer",
  "createdAt": "2013-08-02T22:53:36Z",
  "note": "VWO works differently than other integrations. Their javascript is synchronous, so you'll need to drop their javascript snippet onto the page outside of Segment. As soon as you do that, we'll send custom events through to VWO to help you measure A/B test conversions and we'll pass the A/B test experiment variations through to your other tools for deeper downstream analysis.",
  "website": "http://visualwebsiteoptimizer.com",
  "description": "Visual Website Optimizer is an A/B testing tool that lets your marketing team setup A/B tests without having to write any Javascript or HTML code.",
  "level": 3,
  "categories": [
    "A/B Testing"
  ],
  "popularity": 0.0019461564,
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
    "replay",
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
    "replay": {
      "default": true,
      "description": "Sends the experiment id and variation name as traits on the identify call.",
      "label": "Send experiment data to other tools (as an identify call)",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/visual-website-optimizer-default.svg"
  },
  "id": "visual-website-optimizer"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/visual-website-optimizer-default.svg"
}

export default data
