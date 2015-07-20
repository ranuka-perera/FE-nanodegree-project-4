//  Gulp plugins
//    gulp-minify-css:             Minify the CSS
//    gulp-rename:                 Rename the output files. (append .min.)
//    gulp-uglify:                 Minify JS.
//    gulp-minify-html:            Minify HTML.
//    gulp-imagemin:               Minity jpg/png
//    gulp-git:                    Generate gh-pages.
//    gulp-copy:                   Copy files directly.
//    gulp-rev, gulp-rev-replace:  Versioning per new css/js.
//    gulp-useref:                 Manage js/html/css minification.
//    gulp-plumber:                Stop breaking on invalid js.
//    gulp-minify-inline:          Minify inline JS.

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    minifyHTML = require('gulp-minify-html'),
    minifyInline = require('gulp-minify-inline');

gulp.task('scripts', function () {
    gulp.src('src/**/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./dist/')); // Root folder name

});

gulp.task('styles', function() {
    gulp.src('src/**/css/*.css')
        .pipe(minifyCSS({keepSpecialComments: 0})) // Remove comments while minifying.
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./dist/')); // Root folder name
});

gulp.task('html', function (){
    gulp.src('src/**.html')
        .pipe(minifyHTML())
        .pipe(minifyInline())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function (){
    gulp.watch('glob', ['task']);
});



//gulp.task('default', function() {
//	console.log('Hello World');
//});
//
//gulp.task('robot', function(){
//	console.log('I AM A ROBOT');
//});

//gulp.task('robot', function(){
//	console.log('I AM A ROBOT');
//});
//
//gulp.task('hello', function(){
//	console.log('Hello World!')
//});
//
//gulp.task('default', ['hello', 'robot']);

