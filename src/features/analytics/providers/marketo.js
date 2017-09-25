export const id = "marketo"

export const data = {
  "name": "Marketo",
  "slug": "marketo",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://marketo.com",
  "description": "Marketo is a marketing analytics tool that automates your marketing tasks, like sending emails and setting up landing pages, and gives you reports on what's working.",
  "level": 4,
  "categories": [
    "Email"
  ],
  "popularity": 0.008757704,
  "platforms": {
    "browser": true,
    "mobile": true,
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
    "accountId",
    "userId",
    "encryptionKey",
    "privateKey",
    "soapEndpoint"
  ],
  "advancedOptions": [],
  "options": {
    "accountId": {
      "default": "",
      "description": "You can find your Account ID under **Admin > Integration > Munchkin > Tracking Code** in your [Marketo account](https://app-q.marketo.com/).",
      "label": "Account ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Marketo Account ID."
        ]
      ]
    },
    "encryptionKey": {
      "default": "",
      "description": "You can find your Encryption Key under **Admin > Integration > Web Services > SOAP API** in your [Marketo account](https://app-q.marketo.com/).",
      "label": "Encryption Key",
      "private": true,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Marketo Encryption Key."
        ]
      ]
    },
    "privateKey": {
      "default": "",
      "description": "You can find your API Private Key under **Admin > Integration > Munchkin > API Configuration** in your [Marketo account](https://app-q.marketo.com/).",
      "label": "API Private Key",
      "private": true,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Marketo API Private Key."
        ]
      ]
    },
    "soapEndpoint": {
      "default": "",
      "description": "You can find your SOAP Endpoint under **Admin > Integration > Web Services > SOAP API** in your [Marketo account](https://app-q.marketo.com/).",
      "label": "SOAP Endpoint",
      "private": true,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Marketo SOAP Endpoint."
        ],
        [
          "regexp",
          "^https://[a-zA-Z0-9-]+.mktoapi.com/soap/mktows(/[\\d_]+)?$",
          "Please double check your SOAP Endpoint. It should look something like this: `https://840-MWU-930.mktoapi.com/soap/mktows/2_1`."
        ]
      ]
    },
    "userId": {
      "default": "",
      "description": "You can find your User ID under **Admin > Integration > Web Services > SOAP API** in your [Marketo account](https://app-q.marketo.com/).",
      "label": "User ID",
      "private": true,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Marketo User ID."
        ],
        [
          "regexp",
          "^[a-zA-Z0-9]+([-_][a-zA-Z0-9]+)+$",
          "Please double check your User ID. It should look something like this: `yourcompany1_931693054D55503D5C1B33`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/marketo-default.svg"
  },
  "id": "marketo"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/marketo-default.svg"
}

export default data
