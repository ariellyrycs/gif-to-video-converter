/**
 * Created by arobles on 10/8/14.
 */

'use strict';
var gulp = require('gulp'),
    jade = require('gulp-jade'),
    path = require('./paths.json'),
    jadeHtmlConvert = function() {
    return gulp.src(path.src.jade)
        .pipe(jade())
        .pipe(gulp.dest(path.dest.jade));
};
gulp.task('jade', ['remove'], jadeHtmlConvert);
gulp.task('jade:onlyWatch', jadeHtmlConvert);
