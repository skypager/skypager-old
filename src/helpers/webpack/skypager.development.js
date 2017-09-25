const { join, dirname, resolve } = pathUtils

const entry = { index: "index.js" }
const portfolio = skypager.fsx.findUpSync("package.json", { cwd: join(skypager.cwd, "..") })
const portfolioRoot = dirname(portfolio)
