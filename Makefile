build:
	@node_modules/.bin/browserify browser.js > public/bundle.js

.PHONY: build
