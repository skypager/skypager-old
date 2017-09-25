export const id = "simpli.fi"

export const data = {
  "name": "Simpli.fi",
  "slug": "simpli.fi",
  "createdAt": "2014-07-28T00:00:00Z",
  "note": "",
  "website": "http://simpli.fi",
  "description": "Simpli.fi is a programmatic advertising platform based on unstructured data.",
  "level": 5,
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
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "advertiserId",
    "optInSegment",
    "optOutSegment",
    "events"
  ],
  "advancedOptions": [],
  "options": {
    "advertiserId": {
      "default": "",
      "description": "Your Advertiser ID provided by your Simpli.fi account manager, in the pixel as `cid`.",
      "label": "Advertiser ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Advertiser ID."
        ]
      ]
    },
    "events": {
      "description": "Configure a pixel",
      "fields": [
        {
          "default": "",
          "description": "The Segment event you're sending to our API via analytics.track().",
          "key": "event",
          "label": "Event",
          "type": "string",
          "validators": [
            [
              "required",
              "please enter the event name"
            ]
          ]
        },
        {
          "default": "",
          "description": "The name simpli.fi gives you for your conversion event, in the pixel as `tid`.",
          "key": "tid",
          "label": "Conversion Event Name",
          "type": "string",
          "validators": [
            [
              "required",
              "please enter the simpli.fi conversion event name"
            ]
          ]
        },
        {
          "default": "",
          "description": "The value simpli.fi gives you for a Tag ID, in the pixel as `sifi_tuid`.",
          "key": "sifi_tuid",
          "label": "Tag ID",
          "type": "string",
          "validators": [
            [
              "required",
              "please enter the Tag ID"
            ]
          ]
        },
        {
          "default": "",
          "description": "The value simpli.fi gives you for a Conversion ID, in the pixel as `conversion_id`",
          "key": "conversionId",
          "label": "Conversion ID",
          "type": "string",
          "validators": []
        },
        {
          "description": "If this pixel is assigned to a specific campaign, then put your Campaign ID here, in the pixel as `campaign_id`.",
          "key": "campaignId",
          "label": "Campaign ID",
          "type": "string",
          "validators": []
        }
      ],
      "key": "event",
      "label": "Events",
      "type": "mixed"
    },
    "optInSegment": {
      "default": "",
      "description": "This is the value under `segment` parameter in the opt-in pixel URL.",
      "label": "Opt-in Segment",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your opt-in segment name."
        ]
      ]
    },
    "optOutSegment": {
      "default": "",
      "description": "This is the value under `segment` parameter in the opt-out pixel URL.",
      "label": "Opt-out Segment",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your opt-out segment name."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/simplifi-default.svg"
  },
  "id": "simpli.fi"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/simplifi-default.svg"
}

export default data
