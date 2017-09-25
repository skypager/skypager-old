export const id = "salesforce-marketing-cloud"

export const data = {
  "name": "Salesforce Marketing Cloud",
  "slug": "salesforce-marketing-cloud",
  "createdAt": "2015-02-04T03:26:28.26Z",
  "note": "",
  "website": "http://www.exacttarget.com/",
  "description": "The Salesforce Marketing Cloud (formerly ExactTarget) is a marketing suite for creating, targeting, tracking, and managing email and digital media campaigns.",
  "level": 5,
  "categories": [
    "Email"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": true,
    "pageview": false,
    "track": false
  },
  "basicOptions": [
    "clientId",
    "clientSecret",
    "identifyExtensionExternalKey",
    "events"
  ],
  "advancedOptions": [],
  "options": {
    "clientId": {
      "default": "",
      "description": "Your Salesforce Marketing Cloud Client ID. For instructions on how to find your Client ID, check out our [documentation](/docs/integrations/salesforce-marketing-cloud).",
      "label": "Client ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Client ID."
        ]
      ]
    },
    "clientSecret": {
      "default": "",
      "description": "Your Salesforce Marketing Cloud Client Secret. For instructions on how to find your Client Secret, check out our [documentation](/docs/integrations/salesforce-marketing-cloud).",
      "label": "Client Secret",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Client Secret."
        ]
      ]
    },
    "events": {
      "default": {},
      "description": "Use these fields to map your Segment event names to Salesforce Marketing Cloud Data Extensions. We'll only send SMC the conversion events you specify.",
      "fields": [
        {
          "default": "",
          "description": "The name of the event you'd like to send to Salesforce Marketing Cloud.",
          "key": "event",
          "label": "Event Name",
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
          "description": "The *External Key* of the Data Extension you'd like to send this event to. You can find the External Key in the SMC interface by navigating to Data & Analytics > Contact Builder > Data Extensions; the extension's name will appear in the External Key column.",
          "key": "externalKey",
          "label": "External Key",
          "type": "string",
          "validators": [
            [
              "required",
              "Please enter an External Key."
            ]
          ]
        },
        {
          "default": "Contact Key",
          "description": "The target Data Extension's *Primary Key*. If a value is not provided, defaults to \"Contact Key\".",
          "key": "primaryKey",
          "label": "Primary Key",
          "type": "string",
          "validators": [
            [
              "required",
              "Please enter a Primary Key."
            ]
          ]
        }
      ],
      "key": "event",
      "label": "Conversion events",
      "type": "mixed"
    },
    "identifyExtensionExternalKey": {
      "default": "",
      "description": "The *External Key* of the Salesforce Marketing Cloud *Data Extension* to which you'd like to send Identify data. You can find this in the SMC interface by navigating to **Data & Analytics > Contact Builder > Data Extensions**; the extension's name will appear in the *External Key* column.",
      "label": "Identify Data Extension External Key",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your data extension's *External Key*."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/salesforce-marketing-cloud-default.svg"
  },
  "id": "salesforce-marketing-cloud"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/salesforce-marketing-cloud-default.svg"
}

export default data
