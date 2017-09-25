export const id = "xplenty"

export const data = {
  "name": "Xplenty",
  "slug": "xplenty",
  "createdAt": "2015-01-06T00:08:26Z",
  "note": "SQL integrations are only available on the business plan. They connect to your Segment SQL database powered by Amazon Redshift.",
  "website": "https://www.xplenty.com/",
  "description": "Xplenty helps you design, connect and process dataflows with Hadoop. In addition to connecting with Segment, Xplenty processes both structured and unstructured data and integrates with a variety of sources, including SQL data stores, NoSQL databases and cloud storage services.",
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
    "name",
    "organization",
    "username",
    "password"
  ],
  "advancedOptions": [],
  "options": {
    "name": {
      "default": "Segment SQL",
      "description": "The connection name",
      "label": "Name",
      "private": true,
      "readonly": true,
      "type": "string"
    },
    "organization": {
      "default": "segment",
      "description": "Your organization slug",
      "label": "Organization Slug",
      "private": true,
      "readonly": true,
      "type": "string"
    },
    "password": {
      "default": "",
      "description": "Your SQL read-only user password, so that Xplenty can connect to the database.",
      "label": "Password (Read-Only)",
      "private": true,
      "readonly": true,
      "type": "string"
    },
    "username": {
      "default": "readonly",
      "description": "Your SQL username, so that Xplenty can connect to the database.",
      "label": "User name",
      "private": true,
      "readonly": true,
      "type": "string"
    }
  },
  "public": true,
  "redshift": true,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/xplenty-default.svg"
  },
  "id": "xplenty"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/xplenty-default.svg"
}

export default data
