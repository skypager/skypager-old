export const id = "crazy-egg"

export const data = {
  "name": "Crazy Egg",
  "slug": "crazy-egg",
  "createdAt": "2013-09-13T18:14:06Z",
  "note": "",
  "website": "http://crazyegg.com",
  "description": "Crazy Egg is a user testing tool that gives you heatmaps, clickmaps and scrollmaps of your visitors interacting with your site. It helps you learn where your users are having trouble.",
  "level": 2,
  "categories": [
    "Heatmaps and Recordings"
  ],
  "popularity": 0.066169314,
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
    "accountNumber"
  ],
  "advancedOptions": [],
  "options": {
    "accountNumber": {
      "default": "",
      "description": "You can find your Account Number by going to the [Crazy Egg Setup Instructions](http://www.crazyegg.com/instructions) and clicking **I use Wordpress.** Your account number will appear in bold. It should be a series of numbers, like `00938301`.",
      "label": "Account Number",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Crazy Egg Account Number."
        ],
        [
          "regexp",
          "^\\d+$",
          "Double-check your Account Number. It should be a series of numbers, like `00938301`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/crazy-egg-default.svg"
  },
  "id": "crazy-egg"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/crazy-egg-default.svg"
}

export default data
