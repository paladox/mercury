var gulp = require('gulp'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	folders = require('gulp-folders'),
	Builder = require('systemjs-builder');

gulp.task('front-modules', function () {
	//var builder = new Builder();
	//
	//builder.config({
	//	babelOptions: {
	//		plugins: ['transform-es2015-modules-systemjs'],
	//		presets: ['es2015']
	//	},
	//	baseURL: '.',
	//	//defaultJSExtensions: true,
	//	map: {
	//		"babel": "npm:babel-core",
	//	},
	//	paths: {
	//		"npm:*": "node_modules/*",
	//		state: 'front/scripts/baseline/mercury/utils/state'
	//	},
	//	transpiler: 'babel'
	//});
	//
	//return builder
	//	.buildStatic('front/scripts/**/*.js', 'www/front/scripts/modules.js', {
	//		runtime: false
	//	})
	//	.then(function() {
	//		console.log('Build complete');
	//	})
	//	.catch(function(err) {
	//		console.log('Build error');
	//		console.log(err);
	//	});

	return gulp.src([
			'front/scripts/mercury/**/*.js',
			'front/scripts/main/**/*.js'
		])
		// @todo Fix in https://wikia-inc.atlassian.net/browse/XW-562
		// .pipe(newer(path.join(paths.dest, folder + '.js')))
		.pipe(babel({
			presets: ['es2015'],
			plugins: ['transform-es2015-modules-systemjs'],
			moduleIds: true,
			//getModuleId: function (moduleName) {
			//	console.log('###', moduleName);
			//}
			//resolveModuleSource: function (source, filename) {
			//	console.log('###', source, filename);
			//}
		}))
		.pipe(concat('modules.js'))
		//.pipe(gulpif(environment.isProduction, uglify()))
		.pipe(gulp.dest('www/front/scripts'));
});
