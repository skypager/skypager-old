skypager.webpacks.register("dev", () => require(skypager.join("webpacks", "dev.js")))
skypager.webpacks.register("prod", () => require(skypager.join("webpacks", "prod.js")))
skypager.selectors.register("components", require(skypager.join("selectors", "components.js")))
skypager.selectors.register("pages", require(skypager.join("selectors", "pages.js")))
