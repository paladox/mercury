/*
 * scripts-front
 * Compiles front ts files
 */

var gulp = require('gulp'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	folders = require('gulp-folders'),
	gulpif = require('gulp-if'),
	gutil = require('gulp-util'),
	orderedMergeStream = require('ordered-merge-stream'),
	// @todo Fix in https://wikia-inc.atlassian.net/browse/XW-562
	// newer = require('gulp-newer'),
	ts = require('gulp-typescript'),
	uglify = require('gulp-uglify'),
	environment = require('../utils/environment'),
	options = require('../options').scripts.front,
	paths = require('../paths').scripts.front,
	path = require('path'),
	tsProjects = {};

gulp.task('scripts-front', folders(paths.src, function (folder) {
	var esStream;

	var pth = paths.jsFiles[folder].map(function(p) {
		return path.join(paths.src, folder, p);
	});

	// build ES6
	esStream = gulp.src(pth)
	// @todo Fix in https://wikia-inc.atlassian.net/browse/XW-562
	// .pipe(newer(path.join(paths.dest, folder + '.js')))
	.pipe(babel({
		presets: ['es2015']
	}));

	return esStream
		.pipe(concat(folder + '.js'))
		.pipe(gulpif(environment.isProduction, uglify()))
		.pipe(gulp.dest(paths.dest));
}));
