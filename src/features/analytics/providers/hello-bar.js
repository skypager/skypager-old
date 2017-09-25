export const id = "hello-bar"

export const data = {
  "name": "Hello Bar",
  "slug": "hello-bar",
  "createdAt": "2014-04-07T09:59:30Z",
  "note": "",
  "website": "https://www.hellobar.com/",
  "description": "Hello Bar is a free optimization tool that allows you to show the right message at the right time to your website visitors.",
  "level": 1,
  "categories": [
    "Personalization"
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
    "track": true
  },
  "basicOptions": [
    "apiKey"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can find your Hello Bar API Key, in the provided `<script>` tag for example: `<script src=\"//s3.amazonaws.com/scripts.hellobar.com/API_KEY.js\">`",
      "label": "API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your API Key."
        ],
        [
          "regexp",
          "^[A-Za-z0-9]{40}$",
          "Please double check your API Key. It should be 40 characters long, and look something like this: `256d35ef418c87406fddab5b91a3db7b65d3093c`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/hellobar-default.svg"
  },
  "id": "hello-bar"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/hellobar-default.svg"
}

export default data
