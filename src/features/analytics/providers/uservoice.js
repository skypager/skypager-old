export const id = "uservoice"

export const data = {
  "name": "UserVoice",
  "slug": "uservoice",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://uservoice.com",
  "description": "UserVoice is a customer support and feedback tool that lets your users submit feedback right from your site, and helps you manage all the incoming requests.",
  "level": 2,
  "categories": [
    "Helpdesks",
    "Surveys"
  ],
  "popularity": 0.023678236,
  "platforms": {
    "browser": true,
    "mobile": false,
    "server": false
  },
  "methods": {
    "alias": false,
    "group": true,
    "identify": true,
    "pageview": false,
    "track": false
  },
  "basicOptions": [
    "apiKey"
  ],
  "advancedOptions": [
    "showWidget",
    "smartvote",
    "mode",
    "accentColor",
    "trigger",
    "triggerPosition",
    "triggerColor",
    "triggerBackgroundColor",
    "classic",
    "forumId",
    "classicMode",
    "primaryColor",
    "linkColor",
    "tabLabel",
    "tabColor",
    "tabPosition",
    "tabInverted",
    "screenshotEnabled",
    "ticketCustomFields"
  ],
  "options": {
    "accentColor": {
      "default": "#448dd6",
      "description": "Accent Color",
      "label": "Accent Color",
      "type": "color",
      "validators": [
        [
          "color",
          "Double check the color, it should be a 3-digit or 6-digit hex value preceded by a `#`, like: `#448dd6`."
        ]
      ]
    },
    "apiKey": {
      "default": "",
      "description": "Your API Key appears in the javascript snippet URL as widget.uservoice.com/APIKEY.js. This setting is required.",
      "label": "Javascript API Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your UserVoice Javascript API Key."
        ],
        [
          "regexp",
          "^[a-zA-Z0-9]+$",
          "Please double check your Javascript API Key. It should look something like this: `Gf99Sxi5JFN8oC6JpciLVg`."
        ]
      ]
    },
    "classic": {
      "default": false,
      "description": "If you want to use the classic version of the UserVoice widget make sure to enable this setting, and customize it using the any of the **classic options** below.",
      "label": "Use the Classic Widget",
      "legend": "If you want to use the classic version of the UserVoice widget make sure to enable this setting, and customize it using the any of the **classic options** below.",
      "type": "boolean"
    },
    "classicMode": {
      "default": "full",
      "description": "Select Mode",
      "label": "Mode (Classic)",
      "options": [
        {
          "text": "Support & Feedback",
          "value": "full"
        },
        {
          "text": "Support Only",
          "value": "support"
        },
        {
          "text": "Feedback Only",
          "value": "feedback"
        }
      ],
      "type": "select"
    },
    "forumId": {
      "default": "",
      "description": "Your Forum ID appears in the JavaScript code snippet as `forum_id: YOUR_FORUM_ID`.",
      "label": "Forum ID (Classic)",
      "legend": "Your Forum ID appears in the JavaScript code snippet as `forum_id: YOUR_FORUM_ID`.",
      "type": "string",
      "validators": [
        [
          "regexp",
          "^\\d+$",
          "Double-check your Forum ID. It should be a series of numbers, like `993715`."
        ]
      ]
    },
    "linkColor": {
      "default": "#007dbf",
      "description": "The `linkColor` setting defaults to \"#007dbf\".",
      "label": "Widget Links Color (Classic)",
      "type": "color",
      "validators": [
        [
          "color",
          "Double check the color, it should be a 3-digit or 6-digit hex value preceded by a `#`, like: `#FF0000`."
        ]
      ]
    },
    "mode": {
      "default": "contact",
      "description": "The mode setting defaults to \"full\".",
      "label": "Mode",
      "options": [
        {
          "text": "Contact",
          "value": "contact"
        },
        {
          "text": "SmartVote",
          "value": "smartvote"
        },
        {
          "text": "Satisfaction",
          "value": "satisfaction"
        }
      ],
      "type": "select"
    },
    "primaryColor": {
      "default": "#CC6D00",
      "description": "The primaryColor setting defaults to \"#cc6d00\".",
      "label": "Primary Widget Color (Classic)",
      "type": "color",
      "validators": [
        [
          "color",
          "Double check the color, it should be a 3-digit or 6-digit hex value preceded by a `#`, like: `#FF0000`."
        ]
      ]
    },
    "screenshotEnabled": {
      "default": true,
      "description": "This will allow users to submit a screenshot of the current window when submitting a message with the contact form.",
      "label": "Enable Screenshots",
      "type": "boolean"
    },
    "showWidget": {
      "default": true,
      "description": "Show the UserVoice Widget on Page Load",
      "label": "Show the UserVoice Widget on Page Load",
      "type": "boolean"
    },
    "smartvote": {
      "default": true,
      "description": "Enable SmartVote",
      "label": "Enable SmartVote",
      "type": "boolean"
    },
    "tabColor": {
      "default": "#CC6D00",
      "description": "The `tabColor` setting defaults to \"#cc6d00\".",
      "label": "Tab Color (Classic)",
      "type": "color",
      "validators": [
        [
          "color",
          "Double check the color, it should be a 3-digit or 6-digit hex value preceded by a `#`, like: `#FF0000`."
        ]
      ]
    },
    "tabInverted": {
      "default": false,
      "description": "The `tabInverted` setting defaults to `false`.",
      "label": "Invert the Tab's Colors (Classic)",
      "type": "boolean"
    },
    "tabLabel": {
      "default": "feedback",
      "description": "The `tabLabel` setting defaults to \"Feedback & Support\".",
      "label": "Tab Label (Classic)",
      "type": "string"
    },
    "tabPosition": {
      "default": "middle-right",
      "description": "The `tabPosition` setting defaults to \"middle-right\".",
      "label": "Tab Position (Classic)",
      "options": [
        {
          "text": "Top-Right",
          "value": "top-right"
        },
        {
          "text": "Top-Left",
          "value": "top-left"
        },
        {
          "text": "Middle-Right",
          "value": "middle-right"
        },
        {
          "text": "Middle-Left",
          "value": "middle-left"
        },
        {
          "text": "Bottom-Right",
          "value": "bottom-right"
        },
        {
          "text": "Bottom-Left",
          "value": "bottom-left"
        }
      ],
      "type": "select"
    },
    "ticketCustomFields": {
      "default": {},
      "description": "This will allow you to set field value pairs for ticket custom fields (set via your admin console).",
      "label": "Custom Ticket Fields",
      "type": "text-map"
    },
    "trigger": {
      "default": null,
      "description": "If you want to have your own custom UserVoice trigger, add the CSS selector for the trigger here. It might look like: `#uservoice-trigger`.",
      "label": "Custom Trigger Selector",
      "type": "string"
    },
    "triggerBackgroundColor": {
      "default": "rgba(46, 49, 51, 0.6)",
      "description": "This will change the background color of the trigger. It defaults to a translucent gray.",
      "label": "Trigger Background Color",
      "type": "color",
      "validators": [
        [
          "color",
          "Double check the color, it should be a 3-digit or 6-digit hex value preceded by a `#`, like: `#FF0000`, or an RGBA color."
        ]
      ]
    },
    "triggerColor": {
      "default": "#FFFFFF",
      "description": "This will change the color of the text on the trigger, including the question mark.",
      "label": "Trigger Foreground Color",
      "type": "color",
      "validators": [
        [
          "color",
          "Double check the color, it should be a 3-digit or 6-digit hex value preceded by a `#`, like: `#FF0000`, or an RGBA color."
        ]
      ]
    },
    "triggerPosition": {
      "default": "bottom-right",
      "description": "The `triggerPosition` setting defaults to `bottom-right`",
      "label": "Trigger Position",
      "options": [
        {
          "text": "Top-Right",
          "value": "top-right"
        },
        {
          "text": "Top-Left",
          "value": "top-left"
        },
        {
          "text": "Bottom-Right",
          "value": "bottom-right"
        },
        {
          "text": "Bottom-Left",
          "value": "bottom-left"
        }
      ],
      "type": "select"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/uservoice-default.svg"
  },
  "id": "uservoice"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/uservoice-default.svg"
}

export default data
