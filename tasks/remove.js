'use strict';
var gulp = require('gulp'),
    del = require('del'),
    path = require('./paths.json');

gulp.task('remove', function(cb) {
    return del(path.src.remove, cb);
});