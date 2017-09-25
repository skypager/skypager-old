export const id = "mode"

export const data = {
  "name": "Mode",
  "slug": "mode",
  "createdAt": "2014-11-03T00:07:26Z",
  "note": "SQL integrations are only available on the business plan. They connect to your Segment SQL database powered by Amazon Redshift.",
  "website": "http://about.modeanalytics.com/segment/",
  "description": "Mode is a SQL-based analytics tool that lets you query, visualize, and share data. By capturing your entire analytical process in one place, you can achieve deeper insights as a team.",
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
      "description": "Your organization's slug, so that Mode can connect to the correct SQL database.",
      "label": "Organization Slug",
      "private": true,
      "readonly": true,
      "type": "string"
    },
    "password": {
      "default": "",
      "description": "Your SQL read-only user password, so that Mode can connect to the database.",
      "label": "Database Password (read-only)",
      "private": true,
      "readonly": true,
      "type": "string"
    },
    "username": {
      "default": "readonly",
      "description": "Your SQL username, so that Mode can connect to the database.",
      "label": "Database Username",
      "private": true,
      "readonly": true,
      "type": "string"
    }
  },
  "public": true,
  "redshift": true,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/mode-default.svg"
  },
  "id": "mode"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/mode-default.svg"
}

export default data
