const { uniq, mapValues } = lodash

const categoriesMap = {}

const platformsMap = { mobile: [], server: [], browser: [] }

const toCategories = () => `
export const byCategory = ${pretty(categoriesMap)}
export default byCategory
`

const toPlatforms = () => `
export const byPlatform = ${pretty(platformsMap)}
export default byPlatform
`

const pretty = hash => JSON.stringify(mapValues(hash, v => uniq(v).sort()), null, 2)

const toProvider = ({ slug, data }) => `
export const id = ${JSON.stringify(slug)}

export const data = ${JSON.stringify(data, null, 2)}

export const logos = ${JSON.stringify(data.logos, null, 2)}

export default data
`

const data = require("./segment-snapshot")

function read() {
  mapValues(data, (data = {}, slug = "") => {
    const {
      categories = [],
      platforms: { server: isServer, browser: isBrowser, mobile: isMobile }
    } = data

    categories.forEach(cat => {
      categoriesMap[cat] = categoriesMap[cat] || []
      categoriesMap[cat].push(slug)
    })

    isServer && platformsMap["server"].push(slug)
    isMobile && platformsMap["mobile"].push(slug)
    isBrowser && platformsMap["browser"].push(slug)

    skypager.fsx.writeFileSync(
      skypager.join("providers", `${slug}.js`),
      toProvider({ slug, data }).trim() + "\n",
      "utf8"
    )
  })
}

try {
  read()
  skypager.fsx.writeFileSync("platforms.js", toPlatforms().trim() + "\n", "utf8")
  skypager.fsx.writeFileSync("categories.js", toCategories().trim() + "\n", "utf8")
} catch (e) {
  console.log(e)
}
