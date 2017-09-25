export const id = "jackdb"

export const data = {
  "name": "JackDB",
  "slug": "jackdb",
  "createdAt": "2014-11-10T00:07:26Z",
  "note": "SQL integrations are only available on the business plan. They connect to your Segment SQL database powered by Amazon Redshift.",
  "website": "https://www.jackdb.com/",
  "description": "JackDB is a secure, collaborative environment for your team's queries and data-driven insights.",
  "level": 5,
  "categories": [
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
    "organizationSlug",
    "username",
    "password"
  ],
  "advancedOptions": [],
  "options": {
    "organizationSlug": {
      "default": "",
      "description": "Your organization's slug, so that JackDB can connect to the correct SQL database.",
      "label": "Organization Slug",
      "readonly": true,
      "type": "string"
    },
    "password": {
      "default": "",
      "description": "Your SQL read-only user password, so that JackDB can connect to the database.",
      "label": "Database Password (read-only)",
      "readonly": true,
      "type": "string"
    },
    "username": {
      "default": "readonly",
      "description": "Your SQL username, so that JackDB can connect to the database.",
      "label": "Database Username",
      "private": true,
      "readonly": true,
      "type": "string"
    }
  },
  "public": true,
  "redshift": true,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/jackdb-default.svg"
  },
  "id": "jackdb"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/jackdb-default.svg"
}

export default data
