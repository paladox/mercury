/*
 * build
 * Builds the entire application by invoking the other tasks
 */

var gulp = require('gulp'),
	gzip = require('gulp-gzip'),
	environment = require('../utils/environment'),
	options = require('../options'),
	paths = require('../paths');

gulp.task('build', [
	'node-modules',
	'scripts',
	'views'
], function(cb) {
	cb();
});
