export const id = "saasquatch"

export const data = {
  "name": "SaaSquatch",
  "slug": "saasquatch",
  "createdAt": "2014-02-11T09:34:46Z",
  "note": "",
  "website": "http://www.referralsaasquatch.com/",
  "description": "SaaSquatch is a customer referral program for SaaS and web apps.",
  "level": 2,
  "categories": [
    "Referrals"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": false,
    "server": false
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": false,
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "tenantAlias",
    "referralImage"
  ],
  "advancedOptions": [],
  "options": {
    "referralImage": {
      "default": "",
      "description": "An absolute URL for an image that will be used when a referral is made on Facebook. Minimum image size is 114px tall and 155px wide. Not signed in the checksum.",
      "label": "Referral Image URL",
      "type": "string",
      "validators": [
        [
          "optional"
        ],
        [
          "url",
          "Please double-check that your Server URL is valid. It should start with `http://` or `https://`."
        ]
      ]
    },
    "tenantAlias": {
      "default": "",
      "description": "You can find your Tenant Alias in SaaSquatch's Settings page under Install.",
      "label": "Tenant Alias",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Tenant Alias you can find it in SaaSquatch's Settings page under Install."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/saasquatch-default.svg"
  },
  "id": "saasquatch"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/saasquatch-default.svg"
}

export default data
