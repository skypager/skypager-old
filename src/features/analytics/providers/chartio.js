export const id = "chartio"

export const data = {
  "name": "Chartio",
  "slug": "chartio",
  "createdAt": "2014-11-03T00:07:26Z",
  "note": "SQL integrations are only available on the business plan. They connect to your Segment SQL database powered by Amazon Redshift.",
  "website": "https://chartio.com",
  "description": "Chartio is a powerful business intelligence tool that anyone can use. Use our drag and drop interface, or SQL, to create in-depth analyses and beautiful visualizations of your data.",
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
    "projectSlug",
    "username",
    "password"
  ],
  "advancedOptions": [],
  "options": {
    "organizationSlug": {
      "default": "",
      "description": "Your organization's slug, so that Chartio can connect to the correct SQL database.",
      "label": "Organization Slug",
      "private": true,
      "readonly": true,
      "type": "string"
    },
    "password": {
      "default": "",
      "description": "Your SQL read-only user password, so that Chartio can connect to the database.",
      "label": "Database Password (read-only)",
      "private": true,
      "readonly": true,
      "type": "string"
    },
    "projectSlug": {
      "default": "",
      "description": "Your project's slug, so that Chartio can read the right tables from the SQL database.",
      "label": "Project Slug",
      "private": true,
      "readonly": true,
      "type": "string"
    },
    "username": {
      "default": "readonly",
      "description": "Your SQL username, so that Chartio can connect to the database.",
      "label": "Database Username",
      "private": true,
      "readonly": true,
      "type": "string"
    }
  },
  "public": true,
  "redshift": true,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/chartio-default.svg"
  },
  "id": "chartio"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/chartio-default.svg"
}

export default data
