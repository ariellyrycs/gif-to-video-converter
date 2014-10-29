/**
 * Created by arobles on 10/10/14.
 */
'use strict';
var gulp = require('gulp'),
    uglify = require('gulp-uglifyjs'),
    path = require('./paths.json'),
    uglifyJsFiles = function() {
    return gulp.src(path.src.uglify)
        .pipe(uglify('main.min.js'))
        .pipe(gulp.dest(path.dest.uglify));
};
gulp.task('ugly', ['concat'], uglifyJsFiles);
gulp.task('ugly:onlyWatch', ['concat:onlyWatch'], uglifyJsFiles);
