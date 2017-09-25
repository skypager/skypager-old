export const id = "comscore"

export const data = {
  "name": "comScore",
  "slug": "comscore",
  "createdAt": "2013-03-28T03:00:46Z",
  "note": "",
  "website": "http://comscore.com",
  "description": "comScore is an audience measurement tool that lets you see demographic data about your website's visitors. It helps you verify that your content is reaching the audience you intend.",
  "level": 1,
  "categories": [
    "Advertising"
  ],
  "popularity": 0.013298735,
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
    "track": false
  },
  "basicOptions": [
    "c2"
  ],
  "advancedOptions": [],
  "options": {
    "c2": {
      "default": "",
      "description": "You can find your `c2` option when you enter your domain and press **Get Tag** at [comScore Direct](http://direct.comscore.com/clients/Default.aspx). The `c2` option is on line 4 of the **Tag Code**.",
      "label": "c2 ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your comScore c2 ID."
        ],
        [
          "regexp",
          "^\\d+$",
          "Please double check your c2 ID. It should be a series of numbers, like this: `95808742`."
        ]
      ]
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/comscore-default.svg"
  },
  "id": "comscore"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/comscore-default.svg"
}

export default data
