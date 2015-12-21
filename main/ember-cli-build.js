/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
	Funnel = require('broccoli-funnel');
	babel = require('broccoli-babel-transpiler');

var BroccoliMergeTrees = require('broccoli-merge-trees');

module.exports = function (defaults) {
	var app = new EmberApp(defaults, {
		outputPaths: {
			app: {
				html: 'main.hbs'
			}
		}
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

	var server = new Funnel('../server', {
		include: ['**/*.js', '**/*.hbs'],
		exclude: ['gulp/**/*', 'node_modules/**/*'],
		destDir: 'server'
	});

	var js = babel(server);

	var nodeModules = new Funnel('../server', {
		include: ['node_modules/**/*'],
		destDir: 'server'
	});

	var configTree = new Funnel('../config', {
		include: ['*.js'],
		destDir: 'config'
	});

	var config = babel(configTree);

	var locales = new Funnel('app/locales', {
		destDir: 'assets/locales'
	});

	var appp = app.toTree([js, nodeModules, config, locales]);

	var mhm = new Funnel(appp, {
		include: ['main.hbs'],
		destDir: 'server/views/_layouts'
	});

	return new BroccoliMergeTrees([appp, mhm]);
};
