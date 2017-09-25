export const id = "looker"

export const data = {
  "name": "Looker",
  "slug": "looker",
  "createdAt": "2014-11-03T00:07:26Z",
  "note": "SQL integrations are only available on the business plan. They connect to your Segment SQL database powered by Amazon Redshift.",
  "website": "http://www.looker.com/?utm_campaign=701E000000083rb",
  "description": "Looker is reinventing business intelligence for the modern company. Looker lets organizations access, control, describe, explore, and visualize their data across any browser, on any device.",
  "level": 5,
  "categories": [
    "Analytics",
    "SQL"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": true,
    "group": true,
    "identify": true,
    "pageview": true,
    "track": true
  },
  "basicOptions": [
    "host",
    "port",
    "database",
    "username",
    "password"
  ],
  "advancedOptions": [],
  "options": {
    "database": {
      "default": "events",
      "description": "The database name.",
      "label": "Database",
      "private": true,
      "readonly": true,
      "type": "string"
    },
    "host": {
      "default": "",
      "description": "The database host url.",
      "label": "Host",
      "private": true,
      "readonly": true,
      "type": "string"
    },
    "password": {
      "default": "",
      "description": "Your SQL read-only user password, so that Looker can connect to the database.",
      "label": "Database Password (Read-only)",
      "private": true,
      "readonly": true,
      "type": "string"
    },
    "port": {
      "default": 5439,
      "description": "The database port number.",
      "label": "Port",
      "private": true,
      "readonly": true,
      "type": "number"
    },
    "username": {
      "default": "readonly",
      "description": "Your SQL username, so that Looker can connect to the database.",
      "label": "Database Username",
      "private": true,
      "readonly": true,
      "type": "string"
    }
  },
  "public": true,
  "redshift": true,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/looker-default.svg"
  },
  "id": "looker"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/looker-default.svg"
}

export default data
