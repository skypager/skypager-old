export const id = "amazon-s3"

export const data = {
  "name": "Amazon S3",
  "slug": "amazon-s3",
  "createdAt": "2015-03-02T07:50:48.126Z",
  "note": "You'll have to grant access to the Segment IAM user via your bucket policy before we can copy logfiles into your bucket. You can find instructions for granting access on the docs page.",
  "website": "http://aws.amazon.com/s3",
  "description": "Our Amazon S3 copies our log files of your raw API calls from our S3 bucket to yours, where you can then perform custom analysis on them.",
  "level": 5,
  "categories": [
    "Analytics"
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
    "bucket"
  ],
  "advancedOptions": [],
  "options": {
    "bucket": {
      "default": "",
      "description": "Your S3 bucket name.",
      "label": "Bucket Name",
      "private": true,
      "required": true,
      "type": "string"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/amazon-s3-default.svg"
  },
  "id": "amazon-s3"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/amazon-s3-default.svg"
}

export default data
