export const id = "adroll"

export const data = {
  "name": "AdRoll",
  "slug": "adroll",
  "createdAt": "2013-04-20T01:25:26Z",
  "note": "",
  "website": "http://adroll.com",
  "description": "AdRoll is a retargeting network. It lets you show ads to visitors who've landed on your site while they are browsing around on other sites or in their Facebook newsfeed.",
  "level": 3,
  "categories": [
    "Advertising"
  ],
  "popularity": 0.030165423,
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
    "advId",
    "pixId"
  ],
  "advancedOptions": [
    "events"
  ],
  "options": {
    "advId": {
      "default": "",
      "description": "You can find your Advertiser ID in your AdRoll dashboard by clicking the **green or red dot** in the lower-left corner. In the Javascript snippet, the Advertiser ID appears as `adroll_avd_id = 'XXXXXXX'` on line 2. It should be 22 characters long, and look something like this: `WYJD6WNIAJC2XG6PT7UK4B`.",
      "label": "Advertiser ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Advertiser ID."
        ],
        [
          "regexp",
          "^[A-Z0-9]{22}$",
          "Please double check your Advertiser ID. It should be 22 characters long, and look something like this: `WYJD6WNIAJC2XG6PT7UK4B`."
        ]
      ]
    },
    "events": {
      "default": {},
      "description": "Adroll uses specific names for conversions events. Use this mapping to translate your event names on the left to Adroll segment names on the right.",
      "label": "Events",
      "type": "text-map"
    },
    "pixId": {
      "default": "",
      "description": "You can find your Pixel ID in your AdRoll dashboard by clicking the **green or red dot** in the lower-left corner. In the Javascript snippet, the Pixel ID appears as `adroll_pix_id = 'XXXXXXX'` on line 3. It should be 22 characters long, and look something like this: `6UUA5LKILFESVE44XH6SVX`.",
      "label": "Pixel ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Pixel ID."
        ],
        [
          "regexp",
          "^[A-Z0-9]{22}$",
          "Please double check your Pixel ID. It should be 22 characters long, and look something like this: `6UUA5LKILFESVE44XH6SVX`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "alt": "https://s3.amazonaws.com/segmentio/logos/adroll-alt.png",
    "default": "https://s3.amazonaws.com/segmentio/logos/adroll-default.svg"
  },
  "id": "adroll"
}

export const logos = {
  "alt": "https://s3.amazonaws.com/segmentio/logos/adroll-alt.png",
  "default": "https://s3.amazonaws.com/segmentio/logos/adroll-default.svg"
}

export default data
