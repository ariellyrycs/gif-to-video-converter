'use strict';

var gulp = require('gulp'),
    fs = require('fs');

//load all files in task dir
var jsFiles = new RegExp(".(js)$", "i");
fs.readdirSync(__dirname + '/tasks').forEach(function (fileName) {
    if(jsFiles.test(fileName)) {
        require(__dirname + '/tasks/' + fileName);
    }
});
//gulp.task('test',);
gulp.task('server', ['lint:APIFiles', 'demon']);
gulp.task('gulpLintFiles', ['lint:gulpFiles', 'watch:gulpFiles']);
gulp.task('build', ['remove', 'concat', 'ugly', 'stylus', 'jade', 'lint']);
gulp.task('dev', ['server', 'gulpLintFiles', 'remove', 'concat', 'ugly', 'stylus', 'jade', 'lint', 'watch', 'connectDev']);
gulp.task('test', ['mocha']);

gulp.task('default', ['dev']);
