export function program(p) {
  return p
    .command("prettify")
    .description("prettify code using prettier")
    .option("--max-width", "the maximum line width")
    .option("--base <base folder>", "only work with files inside of the base folder")
    .option("--pattern <pattern>", "filter by the following pattern first")
    .option("--ignore <ignore>", "ignore pattern")
    .option("--semi", "default false")
    .option("--trailing-comma <val>", "all, none, es5")
    .option("--use-tabs", "use tabs; default false")
    .option("--tab-width <width>", "use the specified width; defaults to 2")
    .option("--print-width <width>", "defaults to 120")
}

export async function validate() {
  return true
}

export async function prepare() {
  const { runtime } = this
  const { fileManager } = runtime
  const { castArray } = runtime.lodash
  const { readFileAsync } = runtime.fsx

  runtime.debug("Preparing prettify command file manager")
  // prettier-ignore
  fileManager.configure(cfg => {
    return cfg
      .baseFolder(runtime.get("argv.base", runtime.cwd))
      .when(runtime.argv.ignore, c => {
        return castArray(runtime.argv.ignore)
          .map(p => runtime.resolve(p))
          .reduce((memo, ignorePath) => memo.ignore(ignorePath), c)
      })
  })

  return this
}

export async function run() {
  const { runtime } = this
  const { fileManager } = runtime
  const {
    printWidth = 120,
    tabWidth = 2,
    useTabs = false,
    trailingComma = "all",
    semi = false,
    singleQuote = false,
    pattern = "*.js",
  } = this.argv

  await fileManager.whenActivated()

  const makePretty = code => {
    try {
      return require("prettier").format(code, { printWidth, tabWidth, useTabs, semi, singleQuote, trailingComma })
    } catch (error) {
      return error
    }
  }

  fileManager.router.get(pattern).forEach(({ subject } = {}) => {
    const file = fileManager.files.get(subject)
    file.readContent().then(() => {
      fileManager.compiled.set(subject, {
        prettier: makePretty(file.content),
      })

      const val = fileManager.compiled.get(subject).prettier

      if (typeof val !== "string") {
        runtime.error("Prettify failed on " + subject, { message: val.message })
      } else {
        fileManager.runtime.fsx.writeFileSync(subject, val, "utf8")
      }
    })
  })
}
