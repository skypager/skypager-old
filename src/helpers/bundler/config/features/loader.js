import defaults from "lodash/defaults"

export default function loader(existing = {}, loader, ext = ".js", options) {
  if (!arguments.length) {
    // eslint-disable-line
    return
  }

  existing = defaults(existing, {
    ".json": [
      {
        loader: "json",
      },
    ],
    ".yml": [
      {
        loader: "json!yaml",
      },
    ],
    ".yaml": [
      {
        loader: "json!yaml",
      },
    ],
  })

  const exts = Array.isArray(ext) ? ext : [ext]

  return exts.reduce((acc, ext) => {
    const loaders = acc[ext] || []

    return {
      ...acc,
      [ext]: [
        ...loaders,
        {
          loader,
          ...options,
        },
      ],
    }
  }, existing)
}
