main() {
    lerna publish --skip-npm --yes --repo-version=37.6.4
    /Users/jon/Projects/skypager/bin/run skypager-runtime buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-core buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-helpers-bundler buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-helpers-client buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-helpers-command buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-helpers-context buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-helpers-document-type buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-helpers-document buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-helpers-page buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-helpers-repl buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-helpers-server buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-helpers-service buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-helpers-webpack buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-runtimes-development buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-runtimes-electron buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-runtimes-node buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-runtimes-react buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-runtimes-universal buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-runtimes-web buildPackage
    /Users/jon/Projects/skypager/bin/run skypager-features-document-database buildPackage
    bin/export
    cd /Users/jon/Projects/skypager/packages/skypager-core && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-runtime && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-helpers-bundler && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-helpers-client && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-helpers-command && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-helpers-context && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-helpers-document-type && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-helpers-document && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-helpers-page && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-helpers-repl && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-helpers-server && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-helpers-service && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-helpers-webpack && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-runtimes-development && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-runtimes-electron && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-runtimes-node && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-runtimes-react && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-runtimes-universal && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-runtimes-web && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager-features-document-database && npm publish
    cd /Users/jon/Projects/skypager/packages/skypager && npm publish

}
main
