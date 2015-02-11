REPORTER = spec

test:
		@NODE_ENV=test ./node_modules/.bin/mocha --harmony-generators --reporter=spec ./test.js
test-coffee:
		@NODE_ENV=test ./node_modules/.bin/mocha --harmony-generators --reporter=spec --compilers=coffee:coffee-script/register ./
