export const id = "intercom"

export const data = {
  "name": "Intercom",
  "slug": "intercom",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://intercom.io",
  "description": "Intercom enables web and mobile businesses to see and talk to their users. With live user intelligence you can send relevant messages that start conversations and create personalized experiences.",
  "level": 2,
  "categories": [
    "Email",
    "Helpdesks",
    "Customer Success"
  ],
  "popularity": 0.08260785,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": true,
    "identify": true,
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "appId",
    "apiKey"
  ],
  "advancedOptions": [
    "activator"
  ],
  "options": {
    "activator": {
      "default": "#IntercomDefaultWidget",
      "description": "By default, Intercom will inject their own inbox button onto the page, but you can choose to use your own custom button instead by providing a CSS selector like: `#my-button`. _Note: you must have enable the **Show the Intercom Inbox** setting for this to work._. The default value is `#IntercomDefaultWidget`",
      "label": "Custom Inbox Button Selector",
      "type": "string",
      "validators": [
        [
          "regexp",
          "^[#\\.]+",
          "Make sure to include the `#` or `.` in your CSS selector, like `#my-button`, the default value is `#IntercomDefaultWidget`"
        ]
      ]
    },
    "apiKey": {
      "default": "",
      "description": "Note: this is **required** to send data to Intercom from your servers. You can find your API key after activating your account under the **Configure > API Keys** at [Intercom.io](https://intercom.io). It should be 40 characters long, and look something like this: `4ad6ce80fc1d441324cfb11cdf8d3ade8fc7e8fd`.",
      "label": "Enter your API Key",
      "private": true,
      "type": "string",
      "validators": [
        [
          "regexp",
          "^[a-z0-9]{40}$",
          "Please double check your API Key. It should be 40 characters long, and look something like this: `4ad6ce80fc1d441324cfb11cdf8d3ade8fc7e8fd`."
        ]
      ]
    },
    "appId": {
      "default": "",
      "description": "You can find your API key after activating your account under the **Gear Menu > Configure > API Keys** at [Intercom.io](https://intercom.io).  It should be 8 or 40 characters long, and look something like this: `9iefb489` or `5113430c43a1b34770769dedb3eb3435be1dd1e9`.",
      "label": "Enter your App ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Intercom App ID."
        ],
        [
          "regexp",
          "^([a-z0-9]{7,8}|[a-z0-9]{40})$",
          "Please double check your App ID. It should be 8 or 40 characters long, and look something like this: `9iefb489` or `5113430c43a1b34770769dedb3eb3435be1dd1e9`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/intercom-default.svg"
  },
  "id": "intercom"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/intercom-default.svg"
}

export default data
