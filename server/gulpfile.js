"use strict";
/* global require*/

let gulp = require('gulp');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let minify = require('gulp-minify-css');

gulp.task('js', function(){
   gulp.src('src/scripts/*.js')
   .pipe(concat('script.js'))
   .pipe(uglify())
   .pipe(gulp.dest('build/scripts/'));
});

gulp.task('css', function(){
   gulp.src('src/styles/*.css')
   .pipe(concat('styles.css'))
   .pipe(minify())
   .pipe(gulp.dest('build/styles/'));
});

gulp.task('default',['js','css'],function(){
});