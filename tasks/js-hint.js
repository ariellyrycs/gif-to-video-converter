/**
 * Created by arobles on 10/8/14.
 */
'use strict';
var gulp = require('gulp'),
    jsHint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    path = require('./paths.json'),
    lintJsProductionFiles = function() {
        return gulp.src(this.path)
            .pipe(jsHint('./tasks/.jshintrc'))
            .pipe(jsHint.reporter(stylish));
    };
gulp.task('lint', ['ugly', 'stylus', 'jade'], lintJsProductionFiles.bind({path: path.src.jshint}));
gulp.task('lint:onlyWatch', ['ugly:onlyWatch'], lintJsProductionFiles.bind({path: path.src.jshint}));
gulp.task('lint:gulpFiles', lintJsProductionFiles.bind({path: path.src.jshintGulp}));
gulp.task('lint:APIFiles', lintJsProductionFiles.bind({path: path.src.jshintAPI}));
