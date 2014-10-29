/**
 * Created by arobles on 10/14/14.
 */
'use strict';
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    path = require('./paths.json');

gulp.task('demon', ['lint:APIFiles'], function () {
    return nodemon({
        script: path.src.nodemonServer,
        watch: path.src.nodemonWatch
    }).on('change', ['lint:APIFiles']);
});