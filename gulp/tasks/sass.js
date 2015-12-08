/*
 * sass
 * Compiles sass files and move them into www/
 */

var folders = require('gulp-folders'),
	gulp = require('gulp'),
	prefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	rev = require('gulp-rev'),
	gulpif = require('gulp-if'),
	path = require('path'),
	environment = require('../utils/environment'),
	piper = require('../utils/piper'),
	flip = require('../utils/flip'),
	options = require('../options').sass,
	paths = require('../paths').styles;

gulp.task('sass', folders(paths.src, function (folder) {
	return piper(
		gulp.src([
			path.join(paths.src, folder, paths.compile),
			'!' + path.join(paths.src, folder, paths.partials)
		]),
		sass(options),
		prefixer(['last 2 version', '> 1%', 'ie 8', 'ie 7'], {
			cascade: false,
			map: false
		}),
		flip(),
		gulpif(environment.isProduction, rev()),
		gulp.dest(path.join(paths.dest, folder)),
		gulpif(environment.isProduction, piper(
			rev.manifest('rev-manifest-' + folder + '.json'),
			gulp.dest(paths.dest)
		))
	);
}));
