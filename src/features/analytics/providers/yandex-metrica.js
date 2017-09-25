export const id = "yandex-metrica"

export const data = {
  "name": "Yandex Metrica",
  "slug": "yandex-metrica",
  "createdAt": "2013-11-12T20:26:28Z",
  "note": "",
  "website": "https://metrika.yandex.com",
  "description": "Yandex Metrika is a general-purpose, free analytics tool with similar features to Google Analytics, but specifically targeted at Russian websites and traffic sources.",
  "level": 1,
  "categories": [
    "Analytics"
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
    "track": false
  },
  "basicOptions": [
    "counterId",
    "clickmap",
    "webvisor"
  ],
  "advancedOptions": [],
  "options": {
    "clickmap": {
      "default": false,
      "description": "Enables heat mapping reports.",
      "label": "Enable Clickmap Tracking",
      "type": "boolean"
    },
    "counterId": {
      "default": "",
      "description": "Your Counter ID",
      "label": "Counter ID",
      "type": "string",
      "validators": [
        [
          "required",
          "Please enter your Metrica Counter ID."
        ]
      ]
    },
    "webvisor": {
      "default": false,
      "description": "Lets you see playback of a customer's actions including mouse movement, scrolling and clicks.",
      "label": "Enable WebVisor",
      "type": "boolean"
    }
  },
  "public": true,
  "redshift": false,
  "logos": {
    "default": "https://s3.amazonaws.com/segmentio/logos/yandex-metrica-default.svg"
  },
  "id": "yandex-metrica"
}

export const logos = {
  "default": "https://s3.amazonaws.com/segmentio/logos/yandex-metrica-default.svg"
}

export default data
