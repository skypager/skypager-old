export const id = "rjmetrics"

export const data = {
  "name": "RJMetrics",
  "slug": "rjmetrics",
  "createdAt": "2014-11-03T00:07:26Z",
  "note": "SQL integrations are only available on the business plan. They connect to your Segment SQL database powered by Amazon Redshift.",
  "website": "http://rjmetrics.com",
  "description": "RJMetrics helps answer your business questions quickly, using your data. Connect your Segment data with your other data sources into a central RJMetrics data warehouse, and explore your data using their intuitive, actionable dashboards.",
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
      "description": "Your SQL read-only user password, so that RJMetrics can connect to the database.",
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
      "description": "Your SQL username, so that RJMetrics can connect to the database.",
      "label": "Database Username",
      "private": true,
      "readonly": true,
      "type": "string"
    }
  },
  "public": true,
  "redshift": true,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/rjmetrics-default.svg"
  },
  "id": "rjmetrics"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/rjmetrics-default.svg"
}

export default data
