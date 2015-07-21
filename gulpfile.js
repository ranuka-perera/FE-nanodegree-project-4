//  Gulp plugins
//    gulp-minify-css:                      Minify the CSS
//    gulp-uglify:                          Minify JS.
//    gulp-minify-html:                     Minify HTML.
//    gulp-imagemin:                        Minity jpg/png
//    gulp-git:                             Generate gh-pages.
//    gulp-copy:                            Copy files directly.
//    gulp-rev, gulp-rev-replace:           Visioning per new css/js.
//    gulp-useref, gulp-if, gulp-filter:    Manage js/html/css minification (with path selection, etc).
//    gulp-plumber:                         Stop breaking on invalid js.
//    gulp-minify-inline:                   Minify inline JS.
//    gulp-inline-source:                   Inline specified javascript files so that you don't have to repeat code in all files.

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    minifyHTML = require('gulp-minify-html'),
    minifyInline = require('gulp-minify-inline'),
    imagemin = require('gulp-imagemin'),
    useref = require('gulp-useref'),
    rev = require('gulp-rev'),
    revReplace = require("gulp-rev-replace"),
    gulpif = require("gulp-if"),
    inlineSource = require('gulp-inline-source'),
    filter = require('gulp-filter'),
    git = require('gulp-git');
//var debug = require('gulp-debug');

var onError = function (err) {
     console.error(err);
     this.emit('end');
    };
var htmlFilter = filter('**/*.htm?(l)');

gulp.task('minMain', function() {
    var assets = useref.assets(); // Add in the resources used in the HTMLs.
    return gulp.src('src/*.htm?(l)')
        .pipe(inlineSource({compress: false}))  //Inline js files. Don't compress because we are doing it separately.
        .pipe(assets)  //Load the list of js & css files defined in the HTML. (Remove the HTML)
        .pipe(plumber({ //Set Error handling to display only.
            errorHandler: onError
        }))
        .pipe(gulpif('*.js', uglify()))  //Minify JS
        .pipe(gulpif('*.css', minifyCSS({keepSpecialComments: 0})))  //Minify CSS
        .pipe(rev())  //Append hash to make each build unique. (when caching)
        .pipe(assets.restore()) //Restore the HTML files back into the virtual file system.
        .pipe(useref())  //Restore original files with new minified names.
        .pipe(revReplace())  //Replace minified names with hash-appended minified names.
        .pipe(htmlFilter)
        .pipe(minifyHTML())  //Minify the HTML files.
        .pipe(minifyInline())  //Minify the script tags in the HTML.
        .pipe(htmlFilter.restore())
        .pipe(gulp.dest('./dist/'));
});

// We have to duplicate for the pizza site because of a bug in gulp-useref.
// https://github.com/jonkemp/gulp-useref/issues/87
// https://github.com/jonkemp/gulp-useref/issues/106
gulp.task('minPizza', function() {
    var assets = useref.assets({searchPath: './src/views'}); // Add in the resources used in the HTMLs.
    return gulp.src('src/views/*.htm?(l)')
        .pipe(inlineSource({compress: false}))  //Inline js files. Don't compress because we are doing it separately.
        .pipe(assets)  //Load the list of js & css files defined in the HTML. (Remove the HTML)
        .pipe(plumber({ //Set Error handling to display only.
            errorHandler: onError
        }))
        .pipe(gulpif('*.js', uglify()))  //Minify JS
        .pipe(gulpif('*.css', minifyCSS({keepSpecialComments: 0})))  //Minify CSS
        .pipe(rev())  //Append hash to make each build unique. (when caching)
        .pipe(assets.restore()) //Restore the HTML files back into the virtual file system.
        .pipe(useref())  //Restore original files with new minified names.
        .pipe(revReplace())  //Replace minified names with hash-appended minified names.
        .pipe(htmlFilter)// !Important, without this you risk sending the js file to the html minifier and waste a day debugging it.
        .pipe(minifyHTML())  //Minify the HTML files.
        .pipe(minifyInline())  //Minify the script tags in the HTML.
        .pipe(htmlFilter.restore())
        .pipe(gulp.dest('./dist/views'));
});

// Task to minify all images.
gulp.task('minifyImages', function (){
    gulp.src(['src/**/im{g,ages}/*.jp?(e)g', 'src/**/im{g,ages}/*.png'])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./dist/'));
});

// Task to minify all code.
gulp.task('minifyCode', ['minMain', 'minPizza']);

//Task to minify all files.
gulp.task('default', ['minifyImages', 'minifyCode']);

// Watch to minify all code.
// Minify Code & Images once and run minifyCode on file update.
gulp.task('watch', ['minifyImages', 'minifyCode'], function (){
    gulp.watch('src/**/*.*', ['minifyCode']);
});

//TODO: git workflow