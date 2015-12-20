/*
 * Path list for tasks
 */
var path = require('path'),
	basePath = 'www',
	baseServer = basePath + '/server';

module.exports = {
	base: basePath,
	baseFull: path.resolve(basePath),
	baseFullServer: path.resolve(baseServer),
	scripts: {
		src: 'server/**/*.js',
		config: 'config/*.js',
		dest: basePath
	},
	views: {
		src: 'server/views/**/*.+(hbs|js)',
		dest: basePath + '/server/views'
	},
	nodeModules: {
		src: 'node_modules',
		dest: basePath + '/node_modules'
	},
	server: {
		script: basePath + '/server/server.js'
	},
	config: {
		path: '../config/',
		baseFile: 'localSettings.base.js',
		exampleFile: 'localSettings.example.js',
		runtimeFile: 'localSettings.js'
	}
};
