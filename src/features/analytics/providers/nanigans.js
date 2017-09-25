export const id = "nanigans"

export const data = {
  "name": "Nanigans",
  "slug": "nanigans",
  "createdAt": "2014-04-15T11:39:31Z",
  "note": "",
  "website": "http://www.nanigans.com/",
  "description": "Nanigans is an advertising platform used to find and remarket to your most valuable customers across social and mobile.",
  "level": 5,
  "categories": [
    "Advertising"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": false,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": true,
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "appId",
    "events"
  ],
  "advancedOptions": [
    "isMobile",
    "fbAppId"
  ],
  "options": {
    "appId": {
      "default": "",
      "description": "You can find your App ID in your Nanigans pixel; it's the `xxx` part of the `app_id=xxx` parameter.",
      "label": "App ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your App ID."
        ]
      ]
    },
    "events": {
      "default": {},
      "description": "Use these fields to map your Segment event names to Nanigans event names. We'll only send Nanigans the conversion events you specify.",
      "fields": [
        {
          "default": "",
          "description": "Our Nanigans integration allows you to map the event names you track in Segment to Nanigans events of `name` and `type`.",
          "key": "event",
          "label": "Segment Event Name",
          "type": "string",
          "validators": [
            [
              "required",
              "Please enter an event name."
            ]
          ]
        },
        {
          "default": "",
          "description": "The Nanigans event type for this event.",
          "key": "type",
          "label": "Nanigans Event Type",
          "options": [
            {
              "text": "user",
              "value": "user"
            },
            {
              "text": "visit",
              "value": "visit"
            },
            {
              "text": "purchase",
              "value": "purchase"
            },
            {
              "text": "install",
              "value": "install"
            }
          ],
          "type": "select",
          "validators": [
            [
              "required",
              "Please enter a Nanigans event type."
            ]
          ]
        },
        {
          "default": "",
          "description": "Enter a Nanigans event name.",
          "key": "name",
          "label": "Nanigans Event Name",
          "type": "string",
          "validators": [
            [
              "required",
              "Please enter a Nanigans event name."
            ]
          ]
        }
      ],
      "key": "event",
      "label": "Conversion events",
      "type": "mixed"
    },
    "fbAppId": {
      "default": "",
      "description": "You can find your Facebook App ID in your Nanigans pixel; it's the `xxx` part of the `fb_app_id=xxx` parameter.",
      "label": "Facebook App ID",
      "type": "string"
    },
    "isMobile": {
      "default": false,
      "description": "Select this option to send your data to Nanigans' mobile endpoint. Most projects (even mobile ones) don't need this option enabled; if you're unsure, check with your Nanigans contact. Note that if you set this option, you must also set your *Facebook App ID*.",
      "label": "Send Events to Mobile Endpoint",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/nanigans-default.svg"
  },
  "id": "nanigans"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/nanigans-default.svg"
}

export default data
