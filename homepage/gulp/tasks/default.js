/*
 * default
 * The default gulp task - what is run when you run gulp without any arguments
 */

var gulp = require('gulp');

gulp.task('default', ['lint', 'tslint', 'watch', 'server']);