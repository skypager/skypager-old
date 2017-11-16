main() {
    lerna publish --skip-npm --yes --repo-version=38.0.1
    /Users/jon/Projects/skypager/bin/run skypager-runtime buildPackage
    bin/export
    cd /Users/jon/Projects/skypager/packages/skypager && npm publish

}
main
