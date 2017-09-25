import skypager from "expose?skypager!runtimes/web"

skypager.features.add(require.context("./features", true, /\.js$/))

module.exports = skypager

skypager.use("runtimes/react")
