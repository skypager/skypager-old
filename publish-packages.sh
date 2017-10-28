main() {
  bin/run skypager-core buildPackage
  bin/run skypager-docs buildPackage
  bin/run skypager-runtime buildPackage
  bin/run skypage buildPackage
  bin/run skypager-helpers-bundler buildPackage
  bin/run skypager-helpers-client buildPackage
  bin/run skypager-helpers-command buildPackage
  bin/run skypager-helpers-context buildPackage
  bin/run skypager-helpers-document-type buildPackage
  bin/run skypager-helpers-document buildPackage
  bin/run skypager-helpers-page buildPackage
  bin/run skypager-helpers-repl buildPackage
  bin/run skypager-helpers-server buildPackage
  bin/run skypager-helpers-service buildPackage
  bin/run skypager-helpers-webpack buildPackage
  bin/run skypager-runtimes-development buildPackage
  bin/run skypager-runtimes-electron buildPackage
  bin/run skypager-runtimes-node buildPackage
  bin/run skypager-runtimes-react buildPackage
  bin/run skypager-runtimes-universal buildPackage
  bin/run skypager-runtimes-web buildPackage
  bin/run skypager-features-document-database buildPackage
  bin/run skypager-features-file-manager buildPackage
  bin/run skypager-servers-portfolio buildPackage
  bin/export
  cd /Users/jon/Projects/skypager/packages/skypager-core && npm publish
  cd /Users/jon/Projects/skypager/packages/skypager-runtime && npm publish
  cd /Users/jon/Projects/skypager/packages/skypage && npm publish
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
  cd /Users/jon/Projects/skypager/packages/skypager-features-file-manager && npm publish
  cd /Users/jon/Projects/skypager/packages/skypager-servers-portfolio && npm publish
  cd /Users/jon/Projects/skypager/packages/skypager && npm publish
  }

  main
