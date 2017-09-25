export const id = "dataxu"

export const data = {
  "name": "DataXu",
  "slug": "dataxu",
  "createdAt": "2014-06-01T03:00:46Z",
  "note": "",
  "website": "http://www.dataxu.com/",
  "description": "DataXu helps you manage your ad spend programmatically, this integration helps you track and analyze marketing events such as visits and conversions.",
  "level": 5,
  "categories": [
    "Advertising"
  ],
  "popularity": 0,
  "platforms": {
    "browser": true,
    "mobile": true,
    "server": true
  },
  "methods": {
    "alias": false,
    "group": false,
    "identify": false,
    "pageview": false,
    "track": true
  },
  "basicOptions": [
    "pixels"
  ],
  "advancedOptions": [],
  "options": {
    "pixels": {
      "default": [],
      "description": "Map `event -> pixel-id`, since DataXu expects a `pixelId`. When you `.track('event')` we map the `event` to `pixel-id`",
      "fields": [
        {
          "default": {},
          "description": "We need a mapping of `event -> pixel-id`, since DataXu expects a `pixelId`. When you `.track('event')` we map the `event` to a `pixel-id`.",
          "key": "pixelId",
          "label": "Pixel ID",
          "max": 1,
          "type": "text-map"
        },
        {
          "default": [],
          "description": "DataXu doesn't accept freeform properties, if you add the properties `zip` and `country` and then you `analytics.track('event', { zip: 94107, country: 'US' });` they will be sent in that order to DataXu",
          "key": "tx",
          "label": "Properties mapping",
          "type": "array"
        },
        {
          "default": [],
          "description": "DataXu allows you to map `SKU` just like you do for properties",
          "key": "sku",
          "label": "SKU mapping",
          "type": "array"
        },
        {
          "default": [],
          "description": "DataXu allows you to map `Price` just like you do for properties",
          "key": "price",
          "label": "Price mapping",
          "type": "array"
        }
      ],
      "key": "pixelId",
      "label": "Pixels",
      "type": "mixed"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/dataxu-default.svg"
  },
  "id": "dataxu"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/dataxu-default.svg"
}

export default data
