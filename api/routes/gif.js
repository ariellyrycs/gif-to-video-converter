/**
 * Created by arobles on 10/29/14.
 */
'use strict';

var controllers = require('./../controllers/gif.js');

module.exports = function(app) {
    app.get('/upload', controllers.getVideo);
    app.post('/upload', controllers.uploadGif);
};