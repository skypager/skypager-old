build-main: build-packages
	bin/export

sanity: specs-build
	bin/sanity
	mocha

build-packages:
	bin/run skypager-runtime buildPackage
	bin/sync
	bin/each runtime buildPackage
	bin/each helper buildPackage

specs: specs-build
	mocha

specs-build:
	bin/run skypager-specs buildPackage

specs-json:
	mocha --reporter=json > specs-status.json
