/**
 * Created by arobles on 10/8/14.
 */
'use strict';
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    path = require('./paths.json'),
    stylusCss = function() {
    return gulp.src(path.src.stylus)
        .pipe(stylus())
        .pipe(gulp.dest(path.dest.stylus));
};
gulp.task('stylus', ['remove'], stylusCss);
gulp.task('stylus:onlyWatch', stylusCss);

