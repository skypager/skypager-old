export const id = "salesforce"

export const data = {
  "name": "Salesforce",
  "slug": "salesforce",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://salesforce.com",
  "description": "Salesforce is the most popular CRM on the market. It lets you store your new leads, and manage them throughout your sales pipeline as they turn into paying accounts.",
  "level": 4,
  "categories": [
    "CRMs"
  ],
  "popularity": 0.017839767,
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
    "username",
    "password",
    "securityToken",
    "version"
  ],
  "advancedOptions": [],
  "options": {
    "password": {
      "default": "",
      "description": "Salesforce requires we store a Salesforce user's password to access their SOAP API. We recommend you add a new System Administrator user profile to your Salesforce account, so that you don't have to tell us your actual password. You can do that under **Setup > Administration Setup > Users > New User**.",
      "label": "Account Password",
      "private": true,
      "type": "password",
      "validators": [
        [
          "required",
          "Please enter a Salesforce account password. Note that this does not include appending the account's security token."
        ]
      ]
    },
    "securityToken": {
      "default": "",
      "description": "You can find your Security Token under **Setup > Personal Setup > My Personal Information > [Reset My Security Token](https://na15.salesforce.com/_ui/system/security/ResetApiTokenEdit)**.",
      "label": "Security Token",
      "private": true,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Salesforce account's security token,"
        ],
        [
          "regexp",
          "^[a-zA-Z0-9]{24,25}$",
          "Please double check your Security Token. It should be 24 or 25 characters long, and look something like this: `iwYJvASDfc9wC9U4fo1y2yop`."
        ]
      ]
    },
    "username": {
      "default": "",
      "description": "Enter your Salesforce account email. We recommend creating a separate account just for Segment.io so that you don't need to use your actual password.",
      "label": "Account Email",
      "private": true,
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Salesforce account email."
        ],
        [
          "email",
          "Please double check your email address."
        ]
      ]
    },
    "version": {
      "default": "2",
      "description": "The integration version. See docs for more details.",
      "label": "Version",
      "options": [
        {
          "text": "1",
          "value": "1"
        },
        {
          "text": "2",
          "value": "2"
        }
      ],
      "type": "select"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/salesforce-default.svg"
  },
  "id": "salesforce"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/salesforce-default.svg"
}

export default data
