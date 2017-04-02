// Include Gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


// Task - Scripts
gulp.task('scripts', function(){
	gulp.src([
		'./src/components/jquery/dist/jquery.min.js',
		'./src/components/bootstrap/dist/js/bootstrap.min.js',
		'./src/js/**/*.js'
		])
	.pipe(plumber())
	.pipe(concat('main.js'))
	.pipe(gulp.dest('./dist/js'))
	.pipe(reload({stream:true}));
});

// Task - SCSS to CSS
gulp.task('styles', function(){
	return gulp.src([
		'./src/components/bootstrap/dist/css/bootstrap.min.css',
		'./src/components/components-font-awesome/css/font-awesome.min.css',
		'./src/sass/styles.scss'
	])
	.pipe(plumber())
	.pipe(sass())
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('./dist/css'))
	.pipe(reload({stream:true}));
});


// Task - Fonts 
gulp.task('fonts', function() {
	gulp.src([
		'./src/components/bootstrap/fonts/**/*',
		'./src/components/components-font-awesome/fonts/**/*',
		'./src/fonts/**/*'
		])
	.pipe(gulp.dest('./dist/fonts'))
	.pipe(reload({stream:true}));
})


// Task - HTML 
gulp.task('html', function(){
	gulp.src('./src/**/*.html')
	.pipe(gulp.dest('./dist'))
	.pipe(reload({stream:true}));
});


// Task - BrowserSync 
gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir: "./dist/"
		}
	});
});


// Watch for changes in the following files
gulp.task('watch', function(){
	gulp.watch('./src/fonts/**/*', ['fonts']);
	gulp.watch('./src/sass/*.scss', ['styles']);
	gulp.watch('./src/js/*.js', ['scripts']);
	gulp.watch('./src/**/*.html', ['html']);
});


// Run all tasks above
gulp.task('default', ['fonts', 'styles', 'scripts', 'html', 'browser-sync', 'watch']);
 