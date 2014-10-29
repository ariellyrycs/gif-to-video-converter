'use strict';
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    reload = function () {
    return gulp.src('./webapp/**/*.' + this.type)
        .pipe(connect.reload());
    },
    connectServer = function() {
        return connect.server({
            root: ['webapp'],
            port: 8001,
            livereload: true
        });
    };
gulp.task('reloadConnection:html',['jade:onlyWatch'], reload.bind({type: "html"}));
gulp.task('reloadConnection:js', ['lint:onlyWatch'], reload.bind({type: "js"}));
gulp.task('reloadConnection:css', ['stylus:onlyWatch'], reload.bind({type: "css"}));
gulp.task('connectDev', connectServer);