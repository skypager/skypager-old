main() {
      lerna publish --skip-npm --yes --repo-version=37.5.1
  sky run each-changed-package buildPackage
  ./each-changed-package.sh
  bin/export
  cd /Users/jon/Projects/skypager/packages/skypager && npm publish
  cd /Users/jon/Projects/skypager/packages/skypager-core && npm publish
  cd /Users/jon/Projects/skypager/packages/skypager-helpers-command && npm publish
  cd /Users/jon/Projects/skypager/packages/skypager-runtimes-development && npm publish
  cd /Users/jon/Projects/skypager/packages/skypager-runtimes-electron && npm publish
  cd /Users/jon/Projects/skypager/packages/skypager-runtimes-node && npm publish
  }

  main
