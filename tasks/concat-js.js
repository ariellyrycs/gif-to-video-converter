/**
 * Created by arobles on 10/8/14.
 */

'use strict';
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    path = require('./paths.json'),
    concatJs = function() {
    return gulp.src(path.src.concat)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.dest.concat));
};
gulp.task('concat', ['remove'], concatJs);
gulp.task('concat:onlyWatch', concatJs);
