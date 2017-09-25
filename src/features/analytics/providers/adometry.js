export const id = "adometry"

export const data = {
  "name": "Adometry",
  "slug": "adometry",
  "createdAt": "2015-02-25T06:35:47.532Z",
  "note": "",
  "website": "http://www.adometry.com/",
  "description": "Adometry is a marketing attribution and analytics platform.",
  "level": 3,
  "categories": [
    "Advertising"
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
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "advertiserId",
    "campaignId",
    "events",
    "aliases"
  ],
  "advancedOptions": [],
  "options": {
    "advertiserId": {
      "default": "",
      "description": "You can find your *Advertiser ID* in your Adometry pixel. Look for `advid` in your pixel; if yours were to look like `advid:12345`, your Advertiser ID would be `12345`.",
      "label": "Advertiser ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Advertiser ID."
        ],
        [
          "regexp",
          "^[0-9]+$",
          "Please double check your Advertiser ID."
        ]
      ]
    },
    "aliases": {
      "default": {},
      "description": "Adometry requires that all property key names you send are shortened to a three- or four-letter shorthand. We handle as many conversions for you as possible; see our [documentation](/docs/integrations/adometry/#how-we-handle-property-aliases) for more information on how we handle property aliasing.",
      "label": "Property Aliases",
      "type": "text-map"
    },
    "campaignId": {
      "default": "",
      "description": "You can find your *Campaign ID* in your Adometry pixel. Look for `gid` in your pixel; if yours were to look like `gid:98765`, your Campaign ID would be `98765`.",
      "label": "Campaign ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Campaign ID."
        ],
        [
          "regexp",
          "^[0-9]+$",
          "Please double check your Campaign ID."
        ]
      ]
    },
    "events": {
      "default": {},
      "description": " A mapping of Segment events to Adometry *Placement IDs*. Each Segment event (e.g. `Signed Up`) should map to an Adometry *Placement ID*. You can find each *Placement ID* in your Adometry pixels. Look for `pid` in any pixel; if yours were to look like `pid:54321`, your Placement ID would be `54321`.",
      "label": "Events",
      "type": "text-map"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/adometry-default.svg"
  },
  "id": "adometry"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/adometry-default.svg"
}

export default data
