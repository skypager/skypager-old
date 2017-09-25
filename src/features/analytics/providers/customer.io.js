export const id = "customer.io"

export const data = {
  "name": "Customer.io",
  "slug": "customer.io",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://customer.io",
  "description": "Customer.io is an automated email tool. It lets you set up rules to automatically send emails to your users after they perform actions, making drip email campaigns really easy.",
  "level": 3,
  "categories": [
    "Email"
  ],
  "popularity": 0.120012976,
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
    "track": true
  },
  "basicOptions": [
    "siteId",
    "apiKey"
  ],
  "advancedOptions": [],
  "options": {
    "apiKey": {
      "default": "",
      "description": "You can find your API Key on the Customer.io [Integration page](https://manage.customer.io/integration). It should be 20 or 64 characters long, and look something like this: `91837a6c9e8b49d0ef71`.",
      "label": "API Key",
      "private": true,
      "type": "string",
      "validators": [
        [
          "regexp",
          "^([a-z0-9]{20})?([a-z0-9]{64})?$",
          "Please double check your API Key. It should be 20 or 64 characters long, and look something like this: `91837a6c9e8b49d0ef71`."
        ]
      ]
    },
    "siteId": {
      "default": "",
      "description": "You can find your Site ID on the Customer.io [Integration page](https://manage.customer.io/integration).",
      "label": "Site ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Customer.io Site ID"
        ],
        [
          "regexp",
          "^([a-z0-9]{20})?([a-z0-9]{64})?$",
          "Please double check your Site ID. It should be 20 or 64 characters long, and look something like this: `8d425925af6dbcd47fc4`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/customerio-default.svg"
  },
  "id": "customer.io"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/customerio-default.svg"
}

export default data
