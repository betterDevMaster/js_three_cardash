var gulp    = require('gulp'),

    minify  = require('gulp-minify-css'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    ext_replace = require('gulp-ext-replace'),
    rename  = require('gulp-rename');


gulp.task('css', function(){
	return gulp.src('css/*.*')
	.pipe(minify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('../dist/css'))
});
//move des ressoures

gulp.task('assets', function(){
	return gulp.src('assets/**/*.*')
	.pipe(gulp.dest('../dist/assets'))
});
gulp.task('models', function(){
	return gulp.src('models/*.*')
	.pipe(gulp.dest('../dist/models'))
});
gulp.task('index', function(){
	return gulp.src('*.html')
	.pipe(gulp.dest('../dist/'))
});

// compilation js
gulp.task('js', function(){
	return gulp.src('js/*.js')
	.pipe(ext_replace('.js','.min.js'))
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('../dist/js'))
});
gulp.task('class', function(){
	return gulp.src('js/class/*.js')
	.pipe(ext_replace('.js','.min.js'))
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('../dist/js/class'))
});
gulp.task('lib', function(){
	return gulp.src('js/lib/*.js')
	.pipe(ext_replace('.js','.min.js'))
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('../dist/js/lib'))
});
gulp.task('tuto', function(){
	return gulp.src('js/tuto/*.js')
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('../dist/js/tuto'))
});
gulp.task('three', function(){
	return gulp.src('bower_components/**/build/*.min.js')
	.pipe(gulp.dest('../dist/js/lib'))
});


// WATCH

gulp.task('watch',function(){

    gulp.watch('assets/**/*.*',['assets']);
    gulp.watch('models/*.*',['models']);
    gulp.watch('*.html',['index']);
    gulp.watch('js/*.js',['js']);
    gulp.watch('js/lib/*.js',['lib']);
    gulp.watch('js/tuto/*.js',['tuto']);
    gulp.watch('js/class/*.js',['class']);
    gulp.watch('css/**/*.*',['css']);
});
gulp.task('export',function(){

    gulp.watch('*.*',['assets']);
    gulp.watch('*.*',['models']);
    gulp.watch('*.*',['index']);
    gulp.watch('*.*',['js']);
    gulp.watch('*.*',['lib']);
    gulp.watch('*.*',['tuto']);
    gulp.watch('*.*',['three']);
    gulp.watch('*.*',['class']);
    gulp.watch('*.*',['css']);
});

gulp.task('default', ['watch']);