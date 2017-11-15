"use strict";
/*global require*/
let gulp = require('gulp');
let gutil = require('gulp-util');
// let uglify = require('gulp-uglify');
// let concat = require('gulp-concat');
let gulpif = require('gulp-if');
let cssmin = require('gulp-cssmin');
// let rename = require('gulp-rename');
let rev = require('gulp-rev');
let revReplace = require('gulp-rev-replace');
// let htmlmin = require('gulp-htmlmin');
let useref = require('gulp-useref');
let filter = require('gulp-filter');
let clean = require('gulp-clean');
let runSequence = require('run-sequence');
let replace = require('gulp-replace');
let debug = require('gulp-debug');

/* default task
    required for gulp to launch gulp command */

gulp.task('default', () => {
    gutil.log(gutil.colors.yellow('=== Starting default run sequence ==='));
    runSequence('deletePreviousDestFolder', 'copy', 'processFilesForCacheBump', 'changeBowerLinks');
    gutil.log(gutil.colors.green('=== default run sequence complete ==='));
});

/* take index.html, search for build tags
    concat files and replace its instance in index.html
    if the file is css type, minify it
    rev,revreplace attach a version hash and replace every instance of that file in index.html
    filter asks rev not to attach hash to index.html */

gulp.task('processFilesForCacheBump', function () {
    gutil.log(gutil.colors.yellow('=== Processing files for cache dump ==='));
    var indexHtmlFilter = filter(['**/*', '!**/index.html'], { restore: true });
    return gulp.src('../client/app/index.html')
        .pipe(debug({ title: 'Processing files for cache dump:', showFiles: false }))
        .pipe(useref())
        .pipe(gulpif('*.css', cssmin()))
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('../client/app/dest'));
});

/* Delete previous dest folder 
    just a fail safe method */

gulp.task('deletePreviousDestFolder', function () {
    gutil.log(gutil.colors.yellow('=== Delete previous dest folder ==='));
    return gulp.src('../client/app/dest', { read: false })
        .pipe(debug({ title: 'Delete previous dest folder:', showFiles: false }))
        .pipe(clean({ force: true }));
});

/* changed bower components link in index.html 
    relative urls pointed to parent folder */

gulp.task('changeBowerLinks', function () {
    gutil.log(gutil.colors.yellow('=== Changing bower links ==='));
    gulp.src('../client/app/dest/index.html')
        .pipe(debug({ title: 'Changing bower links:', showFiles: false }))
        .pipe(replace('../bower', './bower'))
        .pipe(gulp.dest('../client/app/dest/'));
    gutil.log(gutil.colors.green('=== Changing bower links done ==='));
});

/* copy the files to dest folder 
    required because some files are not to be processed */

gulp.task('copy', ['copyViewComponents', 'copyFontsBroken', 'copyBowerComponents'], () => {
    gutil.log(gutil.colors.yellow('=== Copying Unprocessed Files ==='));
    gutil.log(gutil.colors.green('=== Copying Unprocessed Files done ==='));
});

gulp.task('copyViewComponents', () => {
    gutil.log(gutil.colors.yellow('=== Copying Views ==='));
    gulp.src('../client/app/components/**/*.html')
        .pipe(debug({ title: 'copying Views components:', showFiles: false }))
        .pipe(gulp.dest('../client/app/dest/components'));
    gutil.log(gutil.colors.green('=== Copying Views components done ==='));
});

gulp.task('copyBowerComponents', () => {
    gutil.log(gutil.colors.yellow('=== Copying Bower Components ==='));
    gulp.src('../client/bower_components/**/*')
        .pipe(debug({ title: 'copying bower components:', showFiles: false }))
        .pipe(gulp.dest('../client/app/dest/bower_components'));
    gutil.log(gutil.colors.green('=== Copying Bower Components done ==='));
});

gulp.task('copyFontsBroken', () => {
    gutil.log(gutil.colors.yellow('=== Copying Fonts ==='));
    gulp.src([
        '../client/bower_components/font-awesome/fonts/*'])
        .pipe(debug({ title: 'copying fonts:', showFiles: false }))
        .pipe(gulp.dest('../client/app/dest/fonts'));
    gutil.log(gutil.colors.green('=== Copying Fonts done ==='));
});
