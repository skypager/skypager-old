#!/bin/sh




lerna publish --skip-npm --yes --repo-version=37.4.0
sky run each buildPackage > build-packages.sh
chmod +x build-packages.sh
./build-packages.sh




bin/export
cd /Users/jonathan/Portfolio/src/github.com/skypager/skypager/packages/skypager && npm publish
cd /Users/jonathan/Portfolio/src/github.com/skypager/skypager/packages/skypager-cli-base && npm publish
cd /Users/jonathan/Portfolio/src/github.com/skypager/skypager/packages/skypager-helpers-webpack && npm publish
cd /Users/jonathan/Portfolio/src/github.com/skypager/skypager/packages/skypager-runtimes-development && npm publish
cd /Users/jonathan/Portfolio/src/github.com/skypager/skypager/packages/skypager-runtimes-electron && npm publish
cd /Users/jonathan/Portfolio/src/github.com/skypager/skypager/packages/skypager-runtimes-node && npm publish
cd /Users/jonathan/Portfolio/src/github.com/skypager/skypager/packages/skypager-runtimes-react && npm publish
cd /Users/jonathan/Portfolio/src/github.com/skypager/skypager/packages/skypager-features-watchman && npm publish








