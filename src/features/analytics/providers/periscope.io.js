export const id = "periscope.io"

export const data = {
  "name": "Periscope.io",
  "slug": "periscope.io",
  "createdAt": "2014-11-03T00:07:26Z",
  "note": "SQL integrations are only available on the business plan. They connect to your Segment SQL database powered by Amazon Redshift.",
  "website": "https://www.periscope.io",
  "description": "Periscope provides the ultimate data visualization tool for the professional data analyst. Realize up to 10,000x speed gains in query speeds, run advanced SQL queries, and quickly and easily share your dashboard.",
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
    "organizationSlug",
    "username",
    "password"
  ],
  "advancedOptions": [],
  "options": {
    "organizationSlug": {
      "default": "",
      "description": "Your organization's slug, so that Periscope can connect to the correct SQL database.",
      "label": "Organization Slug",
      "private": true,
      "readonly": true,
      "type": "string"
    },
    "password": {
      "default": "",
      "description": "Your SQL read-only user password, so that Periscope can connect to the database.",
      "label": "Database Password (read-only)",
      "private": true,
      "readonly": true,
      "type": "string"
    },
    "username": {
      "default": "readonly",
      "description": "Your SQL username, so that Periscope can connect to the database.",
      "label": "Database Username",
      "private": true,
      "readonly": true,
      "type": "string"
    }
  },
  "public": true,
  "redshift": true,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/periscope-io-default.svg"
  },
  "id": "periscope.io"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/periscope-io-default.svg"
}

export default data
