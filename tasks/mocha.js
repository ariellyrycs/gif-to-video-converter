/**
 * Created by arobles on 10/14/14.
 */
'use strict';
var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    path = require('./paths.json');
gulp.task('mocha', function () {
    return gulp.src(path.src.apiTest, {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});