// Learn more about configuring this file at <https://theintern.github.io/intern/#configuration>.
// These default settings work OK for most people. The options that *must* be changed below are the packages, suites,
// excludeInstrumentation, and (if you want functional tests) functionalSuites

define({
  // The port on which the instrumenting proxy will listen
  // proxyPort: 9000,

  // A fully qualified URL to the Intern proxy
  // proxyUrl: 'http://localhost:9000/',

  // Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
  // specified browser environments in the `environments` array below as well. See
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
  // https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
  // Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
  // automatically
  // capabilities: {
  //   'selenium-version': '2.33.0'
  // },

  // Browsers to run integration testing against. Options that will be permutated are browserName, version, platform,
  // and platformVersion; any other capabilities options specified for an environment will be copied as-is. Note that
  // browser and platform names, and version number formats, may differ between cloud testing systems.
  // environments: [
  //   { browserName: 'firefox' }
  // ],

  // Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
  // maxConcurrency: 2,

  // Name of the tunnel class to use for WebDriver tests.
  // See <https://theintern.github.io/intern/#option-tunnel> for built-in options


  	// The desired AMD loader to use when running unit tests (client.html/client.js). Omit to use the default Dojo
	// loader
	// loaders: {
	// 	'host-node': '../../dojo/dojo',
	// 	'host-browser': 'node_modules/dojo/dojo.js'
	// },

  // Configuration options for the module loader; any AMD configuration options supported by the AMD loader in use
  // can be used here.
  // If you want to use a different loader than the default loader, see
  // <https://theintern.github.io/intern/#option-useLoader> for more information.
  loaderOptions: {
    // Packages that should be registered with the loader in each testing environment
    packages: [
      { name: 'zoneerder', location: '.' },
      { name: 'dojo', location: './dojo' },
      { name: 'dijit', location: './dijit' }
    ]
  },



  // Unit test suite(s) to run in each browser
  suites: [ 'tests/all' ],

  // Functional test suite(s) to execute against each browser once unit tests are completed
  functionalSuites: [ /* 'myPackage/tests/functional' */ ],

  // A regular expression matching URLs to files that should not be included in code coverage analysis. Set to `true`
  // to completely disable code coverage.
  excludeInstrumentation: /^(?:tests|node_modules)\//
});
