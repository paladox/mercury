/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
	babel = require('broccoli-babel-transpiler'),
	concat = require('broccoli-concat');

module.exports = function (defaults) {
	var app = new EmberApp(defaults, {
		// Add options here
	});

	// Use `app.import` to add additional libraries to the generated
	// output files.
	//
	// If you need to use different assets in different
	// environments, specify an object as the first parameter. That
	// object's keys should be the environment name and the values
	// should be the asset to use in that environment.
	//
	// If the library that you are including contains AMD or ES6
	// modules that you would like to import into your application
	// please specify an object with the list of modules as keys
	// along with the exports of each module as its value.
	var mercuryModulesTranspiled = new babel('../front/scripts/mercury', {
			modules: 'amd',
			moduleIds: true,
			sourceRoot: 'mercury'
		}),
		mercuryModulesConcatenated = concat(mercuryModulesTranspiled, {
			outputFile: 'assets/mercury.js',
			inputFiles: ['**/*.js']
		});

	var baselineTranspiled = new babel('../front/scripts/baseline'),
		baselineConcatenated = concat(baselineTranspiled, {
			outputFile: 'assets/baseline.js',
			inputFiles: ['**/*.js']
		});

	app.import(app.bowerDirectory + '/script.js/dist/script.js');
	app.import(app.bowerDirectory + '/fastclick/lib/fastclick.js');
	app.import(app.bowerDirectory + '/hammerjs/hammer.js');
	app.import(app.bowerDirectory + '/headroom.js/dist/headroom.js');
	app.import(app.bowerDirectory + '/jquery.cookie/jquery.cookie.js');
	app.import(app.bowerDirectory + '/ember-hammer/ember-hammer.js');
	app.import(app.bowerDirectory + '/i18next/i18next.js');
	app.import(app.bowerDirectory + '/vignette/dist/vignette.js');
	app.import(app.bowerDirectory + '/numeral/numeral.js');
	app.import(app.bowerDirectory + '/weppy/dist/weppy.js');
	app.import(app.bowerDirectory + '/visit-source/dist/visit-source.js');
	app.import(app.bowerDirectory + '/Autolinker.js/dist/Autolinker.min.js');
	app.import(app.bowerDirectory + '/ember-performance-sender/dist/ember-performance-sender.js');

	return app.toTree([mercuryModulesConcatenated, baselineConcatenated]);
};
