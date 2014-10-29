/**
 * Created by arobles on 10/8/14.
 */
'use strict';
var gulp = require('gulp'),
    path = require('./paths.json'),
    asyncTaskControl = [{
        "src": path.src.concat,
        "events": ['ugly:onlyWatch', 'lint:onlyWatch', 'reloadConnection:js', 'reloadConnection:html']
    },
    {
        "src": path.src.jade,
        "events": ['jade:onlyWatch', 'reloadConnection:html']
    },
    {
        "src": path.src.stylus,
        "events": ['stylus:onlyWatch', 'reloadConnection:css', 'reloadConnection:html']
    }],
    asyncBuildTasks = function () {
        var run = function () {
                console.log('reloaded');
            },
            watch = function () {
                gulp.run(this.asyncTaskControl, run);
            };
        gulp.watch(asyncTaskControl[0].src, watch.bind({asyncTaskControl: asyncTaskControl[0].events}));
        gulp.watch(asyncTaskControl[1].src, watch.bind({asyncTaskControl: asyncTaskControl[1].events}));
        gulp.watch(asyncTaskControl[2].src, watch.bind({asyncTaskControl: asyncTaskControl[2].events}));
    },
    asyncGulpTasks = function () {
        var run = function () {
            console.log('Gulp Files');
            },
            watch = function () {
                gulp.run('lint:gulpFiles', run);
            };
        gulp.watch(path.src.jshintGulp, watch);
    };
gulp.task('watch', ['lint'], asyncBuildTasks);
gulp.task('watch:gulpFiles', ['lint:gulpFiles'], asyncGulpTasks);



